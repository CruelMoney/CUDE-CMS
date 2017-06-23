import "isomorphic-fetch"

export const FETCH_REQUEST = 'FETCH_REQUEST'  
export function fetchRequest (endpoint) {  
  return { type: FETCH_REQUEST, endpoint }
}

export const FETCH_FAILURE = 'FETCH_FAILURE'  
export function fetchFailure (endpoint) {  
  return { type: FETCH_FAILURE, endpoint }
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS'  
export function fetchSuccess (data, endpoint) {  
  return { type: FETCH_SUCCESS, endpoint, data }
}

export function fetchData(endpoint) { 
  return (dispatch, getState) => {
    dispatch(fetchRequest(endpoint))
    return fetch(process.env.PUBLIC_URL+endpoint,{credentials: 'include'})
      .then(res=>res.json())
      .then((res) =>dispatch(fetchSuccess(res, endpoint)))
      .catch(err=>{
        console.log("public url: " + process.env.PUBLIC_URL)
        console.log("endpoint: " + endpoint)
        console.log(err)
        dispatch(fetchFailure(endpoint))})
  }
}