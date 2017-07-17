import { connect } from 'react-redux';
import React from 'react';
import * as a from './actions'

export default function editor(WrappedComponent, APIEndpoint) {
    
    const mapStateToProps = (state, ownProps) => {
        return {
            editMode:  state.adminOverlay.editMode,
            publicURL: state.adminOverlay.publicURL
        }
    }

    const mapDispatchToProps = (dispatch) => {  
        return { 
            registerEdits: (id, edits, endpoint) => dispatch(a.registerEdits(endpoint, id , edits)),
            registerPromise: (promise) => dispatch(a.registerPromise(promise))
        }
    }
    const mergeProps = (stateProps, dispatchProps, ownProps) => {
        return { 
            ...stateProps,
            registerEdits: (id, edits, endpoint = APIEndpoint) => dispatchProps.registerEdits(id, edits, stateProps.publicURL+endpoint),
            registerPromise: (promise) => dispatchProps.registerPromise(promise),
            ...ownProps
        }
    }
    class Editor extends React.Component {
        render() {
        return <WrappedComponent {...this.props} />;
        }
    };

return connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor)

}

export {a as actions}