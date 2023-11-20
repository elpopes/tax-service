import {
  FETCH_RESIDENCES,
  FETCH_RESIDENCE,
  CREATE_RESIDENCE,
  UPDATE_RESIDENCE,
  DELETE_RESIDENCE,
  FETCH_RESIDENCES_ERROR,
  FETCH_RESIDENCE_ERROR,
  CREATE_RESIDENCE_ERROR,
  UPDATE_RESIDENCE_ERROR,
  DELETE_RESIDENCE_ERROR,
} from "./residencesActions";

const initialState = {
  residences: [],
  residence: null,
  loading: false,
  error: null,
};

const residencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESIDENCES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RESIDENCE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_RESIDENCE:
    case UPDATE_RESIDENCE:
    case DELETE_RESIDENCE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RESIDENCES_ERROR:
    case FETCH_RESIDENCE_ERROR:
    case CREATE_RESIDENCE_ERROR:
    case UPDATE_RESIDENCE_ERROR:
    case DELETE_RESIDENCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Add cases to handle the success of each CRUD operation
    // These will update the state with the new data
    // Example for FETCH_RESIDENCES_SUCCESS:
    // case FETCH_RESIDENCES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     residences: action.payload,
    //     error: null
    //   };
    // ... similar cases for other success actions

    default:
      return state;
  }
};

export default residencesReducer;
