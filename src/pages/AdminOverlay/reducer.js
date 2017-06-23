import {
  LOGOUT,
  TOGGLE_EDITMODE,
  SAVE_EDITS_SUCCEDED,
  SAVE_EDITS_REQUESTED,
  SAVE_EDITS_FAILED
} from './actions';

const initialState = {
  user: null,
  editMode: false,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state
    case TOGGLE_EDITMODE:
      return{
        ...state,
        editMode: !state.editMode
      }
    case SAVE_EDITS_REQUESTED:
      return{
        ...state,
        loading: true      
      }
    case SAVE_EDITS_FAILED:
      return{
        ...state,
        loading: false,
        error: action.err      
      }
    case LOGOUT:
      return{
        ...state,
        user: null,
        editMode: false
      }

    case SAVE_EDITS_SUCCEDED:
      return{
          ...state,
          edits: {},
          editMode: false,
          loading: false,
          error: null
        }
 
  }
};
