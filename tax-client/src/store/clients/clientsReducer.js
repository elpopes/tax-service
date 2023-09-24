import {
  UPDATE_CLIENT,
  UPDATE_CLIENT_ERROR,
  CREATE_CLIENT,
  DELETE_CLIENT,
} from "./clientsActions";

const initialState = {
  byId: {},
  errors: null,
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CLIENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
        errors: null,
      };
    case UPDATE_CLIENT_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CREATE_CLIENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case DELETE_CLIENT:
      const newClientsState = { ...state };
      delete newClientsState.byId[action.payload.id];
      return newClientsState;
    default:
      return state;
  }
};

export default clientsReducer;
