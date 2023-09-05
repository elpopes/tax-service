import {
  RECEIVE_USERS,
  RECEIVE_USER,
  REMOVE_USER,
  REGISTRATION_ERROR,
  CLEAR_REGISTRATION_ERROR,
} from "./usersActions";

const initialState = {
  users: {},
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user.id]: action.user,
        },
        error: null,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          ...action.users,
        },
      };
    case REMOVE_USER:
      const newState = { ...state };
      delete newState.users[action.userId];
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
