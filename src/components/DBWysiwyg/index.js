import React from 'react';
import connectEditor from '../../higher-order-components/Editor/index';
import fetcher from '../../higher-order-components/Fetcher/index';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {upload as imgUpload} from '../../utils/imageUpload';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



class EditableText extends React.Component {

    static propTypes={
        registerEdits: PropTypes.func.isRequired
    }

    state={
        content: {}
    }

    componentWillMount(){
        let { content } = this.props;
        content = !!content ? JSON.parse(content) : false;
        this.setState({
            content
        });
       
    }
    
    onContentStateChange = (RawDraftContentState) => {
        this.props.registerEdits(this.props.entityID,{
            [this.props.entityField] : JSON.stringify(RawDraftContentState),
            key: this.props.dbKey
        });
        this.setState({
            content: RawDraftContentState
        })
    }

    handleImgUpload = (img) => {
        return imgUpload(img, this.props.publicURL, null);
    }

    render() {
        const { content } = this.state;
        const html = !!content ? draftToHtml(content) : '';
        
        return (
                this.props.editMode ?
                
                <Editor
                    {...this.props}
                    toolbar={{
                        ...this.props.toolbar,
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: this.handleImgUpload,
                            alt: { present: true, mandatory: false },
                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
                          },
                        }}
                    
                    initialContentState={content}
                    onContentStateChange={this.onContentStateChange}
                />

                : //if not editmode
                <div 
                    style={this.props.style}
                    className={this.props.className}
                    dangerouslySetInnerHTML={ {__html:  html} }
                />

        
        );
    }
}

class ConnectedText extends React.Component {

    static contextTypes={
        staticContext: PropTypes.object,
    }
    static propTypes={
        dbKey: PropTypes.string.isRequired
    }


    componentWillMount(){   
        const {
            staticContext,
            haveFetched,
            data,
            dbKey,
            publicURL
        } = this.props;
        

        // only serverside 
        if (staticContext && haveFetched){
            const found = data.some(t=>t.key === dbKey)
            // Create text if does not exist
            if (!found){
                staticContext.promises.push(
                    fetch(publicURL+'/api/texts', {
                        method: 'POST',
                        credentials: 'include',
                        headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({key: dbKey, content: ""})
                    })
                )
            }
         }            
        }


    render() {
        let data = this.props.data.results || this.props.data;
        const dbText = Array.isArray(data) && data.find(t=>t.key === this.props.dbKey) || {}
        const content = dbText ? dbText.content : null
        return (
                <EditableText 
                    {...this.props}
                    key={dbText._id}
                    registerEdits={this.props.registerEdits}
                    entityID={dbText._id}
                    content={content}
                    entityField="content"
                />
        );
    }
}

export default withRouter(
    fetcher(
        connectEditor(ConnectedText, "/api/texts"), 
    "/api/texts")
);



export { EditableText }


