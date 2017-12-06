import {
  FETCH_SUCCESS,
  FETCH_REQUEST,
} from './actions';
import{
  SAVE_EDITS_SUCCEDED,
  REFRESH_DATA
} from '../../pages/AdminOverlay/actions'
import{
    REGISTER_EDITS,
    REGISTER_PROMISE
} from '../Editor/actions'
import update from 'lodash/update'

const initialState = {
    promises: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_REQUEST:
        return{
        ...state,
        [action.endpoint] : {
            fetching : true
        }
      }
    case FETCH_SUCCESS:
      return{
        ...state,
        [action.endpoint] : {
            ...state[action.endpoint],
            isEndpoint: true,
            data: action.data, 
           fetching : false
        }
      }
    case SAVE_EDITS_SUCCEDED:
        return{
            ...state,
        }
    case REFRESH_DATA:
        return{
                ...state,
                [action.endpoint] : {
                    ...state[action.endpoint],
                    data: action.data
                }
            }

      
    case REGISTER_EDITS:
        const hasBeenEdited = state[action.endpoint].edits
        var edits = {}
        //If it has not been edited copy over the current values
        if(!hasBeenEdited && state[action.endpoint].data && Array.isArray(state[action.endpoint].data)){
            //get content
            const oldContent = state[action.endpoint].data.find(d=>d._id === action.id)
            edits = oldContent
        
        //  else use existing edits 
        }else if(state[action.endpoint].edits && state[action.endpoint].edits[action.id]){
            edits = state[action.endpoint].edits[action.id]
        }
        const updatedEdits = update(edits, Object.keys(action.edits)[0], function(originalValue) {
            return action.edits[Object.keys(action.edits)[0]]
        })
        return{
                ...state,
                [action.endpoint] : {
                    ...state[action.endpoint],
                    edits: {
                        ...state[action.endpoint].edits,
                        [action.id]: updatedEdits,
                    }
                
                }
        }
    
       
    case REGISTER_PROMISE:
        return {
            ...state,
            promises: [...state.promises, action.promise]
        }
    
    
    default:
        return state;
        
    } 
};
