import { UPDATE_CLIENT, UPDATE_CLIENT_ERROR } from "./clientsActions";

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
    default:
      return state;
  }
};

export default clientsReducer;
