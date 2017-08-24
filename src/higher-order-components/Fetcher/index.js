import { connect } from 'react-redux';
import React from 'react';
import { fetchData } from './actions';
import PropTypes from 'prop-types'

export default function fetcher(
    WrappedComponent, 
    APIEndpoint, 
    serverFetch = true // Fetching on server? Will increase response time
) {
  

    const mapStateToProps = (state, ownProps) => {
        const publicURL = state.adminOverlay.publicURL
        const apidata = state.apiData[publicURL+APIEndpoint]
        const data = apidata && apidata.data ? apidata.data : []
        return {
            data: ownProps.data ? [...ownProps.data, ...data] : data,
            haveFetched: apidata && apidata.data ? true : false,
            fetching: apidata ? apidata.fetching : false,
            editMode:  state.adminOverlay.editMode,
            publicURL: publicURL // Has to be set by theme or server
        }
    }
    const mapDispatchToProps = (dispatch) => {  
        return { fetchData: (publicURL) => dispatch(fetchData(publicURL+APIEndpoint)) }
    }
    const mergeProps = (stateProps, dispatchProps, ownProps) => {
        return {
            ...stateProps,
            fetchData: () => dispatchProps.fetchData(stateProps.publicURL),
            ...ownProps
        }
    }
    class Fetcher extends React.Component {
        
        static contextTypes={
            staticContext: PropTypes.object
         }

        componentWillMount () {
            if(!this.props.fetching && serverFetch){
                if (this.context.staticContext && !this.context.staticContext.resolved){
                    const store = this.context.staticContext.store
                    this.context.staticContext.promises.push(store.dispatch(fetchData(this.props.publicURL + APIEndpoint)))
                }else{
                    if (this.props.data.length === 0) this.props.fetchData()
                }
            }
        }

        componentDidMount(){
            
             if (!serverFetch && this.props.data.length === 0) {
                 this.props.fetchData()
            }
        }

        render() {
        return <WrappedComponent 
                data={this.props.data} 
                {...this.props} />;
        }
    };

return connect(mapStateToProps, mapDispatchToProps, mergeProps)(Fetcher)



}