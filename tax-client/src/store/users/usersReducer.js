import {
  RECEIVE_USERS,
  RECEIVE_USER,
  REMOVE_USER,
  REGISTRATION_ERROR,
  CLEAR_REGISTRATION_ERROR,
} from "./usersActions";

const initialState = {
  byId: {},
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.user.id]: action.user,
        },
        error: null,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.users,
        },
      };
    case REMOVE_USER:
      const newState = { ...state };
      delete newState.byId[action.userId];
      return newState;
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_REGISTRATION_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
