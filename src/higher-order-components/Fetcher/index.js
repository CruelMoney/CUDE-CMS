import { connect } from 'react-redux';
import React from 'react';
import { fetchData as fetchDataAction } from './actions';
import { withRouter } from 'react-router'

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
            data: ownProps.data ? [...data, ...ownProps.data] : data,
            haveFetched: apidata && apidata.data ? true : false,
            fetching: apidata ? apidata.fetching : false,
            editMode:  !!state.adminOverlay.editMode,
            publicURL: publicURL // Has to be set by theme or server
        }
    }
    const mapDispatchToProps = (dispatch) => {  
        return { fetchData: (publicURL) => dispatch(fetchDataAction(publicURL+APIEndpoint)) }
    }
    const mergeProps = (stateProps, dispatchProps, ownProps) => {
        return {
            ...ownProps,
            ...stateProps,
            fetchData: () => dispatchProps.fetchData(stateProps.publicURL),
        }
    }
    class Fetcher extends React.Component {

        componentWillMount () {
            const {
                fetching,
                staticContext,
                data,
                publicURL,
                fetchData
            } = this.props;

            if(!fetching && serverFetch){
                console.log("fetchercontext: ", staticContext)
                if (staticContext && !staticContext.resolved){
                    const store = staticContext.store
                    staticContext.promises.push(store.dispatch(fetchDataAction(publicURL + APIEndpoint)))
                }else{
                    if (data.length === 0) fetchData()
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
                {...this.props}
                data={this.props.data} 
                />;
        }
    };

return withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(Fetcher)
)



}