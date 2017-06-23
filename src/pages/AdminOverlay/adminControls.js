import React from 'react';
import { connect } from 'react-redux';
import  * as a  from './actions';
import PullDown from '../../assets/icons/pull-down.svg'
import FeedCursor from '../../higher-order-components/CursorPosition/index'
import styles from './index.module.css';

const mapStateToProps = (state, ownProps) => {
  return {
    user:  state.adminOverlay.user || {},
    apiData: state.apiData || {},
    loading: state.adminOverlay.loading,
    editMode: state.adminOverlay.editMode
  }
}
const mapDispatchToProps = (dispatch) => {  
  return { 
    toggleEditmode: () => dispatch(a.toggleEditmode()),
    saveEdits: (apiData) => dispatch(a.saveEdits(apiData)) 
    
  }
}

class Controls extends React.Component {
  state={savePlaceholder:0}

  loadingInterval = null

  componentWillReceiveProps(nextprops){
    if(nextprops.loading){
      this.loadingInterval = setInterval(()=>{
        console.log("suh dude")
        this.setState({
          savePlaceholder: (this.state.savePlaceholder+1) % 3
      })}, 1000);

    }else if (this.loadingInterval){
      clearInterval(this.loadingInterval)
    }
  }

  componentWillUnmount(){
    if (this.loadingInterval){
      clearInterval(this.loadingInterval)
    }
  }
    
  render() {
    const arrowVisible = this.props.isActive // comes from feedcursor 

    return (

          <div className={styles.adminControlsWrapper}>

          <PullDown 
            className={styles.pullDownArrow + " " + (arrowVisible ? styles.active : "")}
            onClick={()=>{this.props.toggleCallback(true)}}
            height="80" 
            width="80"/>

          <div className={styles.adminControls}>
            Welcome {this.props.user.name.first}
            <button 
              onClick={this.props.toggleEditmode}
              className={"button-look" + (this.props.editMode ? " active " : "")}>
             EDIT
            </button>
            <button 
              onClick={()=>this.props.saveEdits(this.props.apiData)}
              className={"button-look" + (this.props.loading ? " active " : "")}>
             {this.props.loading ? 
              ("SAVING" + Array(this.state.savePlaceholder+1).join("."))
             :
               "SAVE"}
            </button>
            <button 
              onClick={()=>this.props.toggleCallback(false)}
              className="button-look">
             HIDE
            </button>
            <a 
              className="button-look"
              href="/keystone">
              CMS
            </a>
            <a 
              className="button-look"
              href="/keystone/signout">
              LOGOUT
            </a>
          </div>
          </div>

      
    );
  }
}

export default FeedCursor(connect(mapStateToProps, mapDispatchToProps)(Controls))
