import React from 'react';
import styles from './index.module.css';
import AdminControls from './adminControls'
import configurationProvider from '../../higher-order-components/ConfigurationProvider';
import { connect } from 'react-redux';
import '../../assets/css/cms.css'


class Admin extends React.Component {
  state={
    controlsVisible: false, 
  }
  
  render() {

    return (
      <div className={
        styles.adminOverlay + " " +  
        (this.state.controlsVisible ? styles.active : "") + " " + 
        (this.props.editMode ? "edit-mode" : "")}>
        
        {
          this.props.user.canAccessKeystone ?
            
          <AdminControls 
            toggleCallback={(state)=>{this.setState({controlsVisible: state})}}
          />

          : null
        }
          <div className={styles.content}>
            {this.props.children}
          </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user:  state.adminOverlay.user || {},
    apiData: state.apiData || {},
    editMode : state.adminOverlay.editMode
  }
}

export default connect(mapStateToProps)(
  configurationProvider(Admin)
)
