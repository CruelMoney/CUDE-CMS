import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import fetcher from '../../higher-order-components/Fetcher/index';
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './index.module.css'
import LoadingImage from '../LoadingImage'
import {upload as UploadImage} from '../../utils/imageUpload';

class EditableImage extends React.Component {
    state = {accepted: [], rejected: []}


    upload = (theFile) =>{
        if (!this.state.accepted){
            this.setState({err:"Please select an image."});
            return;
        }
        if (!this.state.accepted.length > 1){
            this.setState({err:"Please select just one image."});
            return;
        }

        // Name = dbKey + suffix
        const fileName = this.props.dbKey + "." + theFile.name.split('.').pop();
        const existingImage = Array.isArray(this.props.data) ? this.props.data.find(img=>img.name === this.props.dbKey) : null;
        

        return new Promise((resolve, reject)=>{
            UploadImage(theFile, this.props.publicURL, existingImage, fileName)
            .then((result)=>{
                this.setState({
                    error: null, 
                    url: result.data.link
                });
                return resolve("Image uploaded");
            })
            .catch((err)=>{
                console.log(err);
                this.setState({error: "Something went wrong."});
                return reject("Image could not be uploaded");
            });
        });

    }

    handleReject = (file) =>{
        if(file.size > 10000000){
            this.setState({error: "The file can't be larger than 4mb."})
            return
        }
        
        this.setState({error: "The file was rejected."})
    }

    handleAccept = (files) =>{
        // TODO changing the image does not remove old promise, thus uploading twice
        // so.. somehow remove old promise from state
        this.setState({src: files[0].preview})
        this.props.registerPromise(()=>this.upload(files[0]))
    }
 
    render() {
        const dbImage = Array.isArray(this.props.data) && this.props.data.find(img=>img.name === this.props.dbKey)
        const url = dbImage ? dbImage.url : this.state.url
        let {dbKey, 
            haveFetched, 
            fetching, 
            editMode, 
            fetchData, 
            registerEdits, 
            registerPromisetest, 
            registerPromise,
            ...rest} = this.props

        return (
            this.props.editMode ?
                <div 
                    className={styles.wrapper + " editable"}
                >
                    <Dropzone
                        maxSize={10000000} //byte
                        multiple={false}
                        className={styles.dropZone}
                        accept="image/jpeg, image/png, image/gif"
                        onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                        onDropRejected={(file)=>this.handleReject(file)}
                        onDropAccepted={(file)=>this.handleAccept(file)}
                        activeStyle={{backgroundColor: "rgba(76, 175, 80, 0.8)", color:"white !important"}}
                        rejectStyle={{backgroundColor: "rgba(244, 67, 54, 0.8)", color:"white !important"}}
                    >
                     
                    </Dropzone>

                    <div>
                        <p>Drop image here, or click to select image to upload.</p>
                        <p>Only *.jpeg, *.png and *.gif images will be accepted.</p>
                        {this.state.accepted.length > 0 ?
                            <p>Image added, click save to upload.</p>
                        : null}
                        {this.state.error ?
                        <p className="error">
                            {this.state.error}
                        </p>
                        : null}
                        
                    </div>

                    {url ? 
                    <LoadingImage 
                    src={this.state.src || (this.props.publicURL + url)} alt=""/>
                    : null}

                    
                        
                </div>
            :
            ( url ? 
            <LoadingImage 
            onClick={this.props.onClick}
            alt={this.props.alt}
            src={this.props.publicURL + url} />
            : null)
        
        );
    }
}



export default fetcher(editor(EditableImage), '/api/fileupload/list')

export { EditableImage }


