import {
  FETCH_RESIDENCE,
  CREATE_RESIDENCE,
  UPDATE_RESIDENCE,
  DELETE_RESIDENCE,
  FETCH_RESIDENCE_ERROR,
  CREATE_RESIDENCE_ERROR,
  UPDATE_RESIDENCE_ERROR,
  DELETE_RESIDENCE_ERROR,
} from "./residencesActions";

const initialState = {
  byClientId: {}, // Storing residences by client ID
  loading: false,
  error: null,
};

const residencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESIDENCE:
      const { clientId, residence } = action.payload;
      return {
        ...state,
        byClientId: {
          ...state.byClientId,
          [clientId]: [...(state.byClientId[clientId] || []), residence],
        },
        loading: false,
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
    case FETCH_RESIDENCE_ERROR:
    case CREATE_RESIDENCE_ERROR:
    case UPDATE_RESIDENCE_ERROR:
    case DELETE_RESIDENCE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "FETCH_RESIDENCE_SUCCESS":
      return {
        ...state,
        byClientId: {
          ...state.byClientId,
          [action.payload.clientId]: action.payload.residence,
        },
        loading: false,
        error: null,
      };
    case "CREATE_RESIDENCE_SUCCESS":
    case "UPDATE_RESIDENCE_SUCCESS":
      return {
        ...state,
        byClientId: {
          ...state.byClientId,
          [action.payload.clientId]: action.payload.residence,
        },
        loading: false,
        error: null,
      };
    case "DELETE_RESIDENCE_SUCCESS":
      const updatedState = { ...state };
      delete updatedState.byClientId[action.payload.clientId];
      return {
        ...updatedState,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default residencesReducer;
