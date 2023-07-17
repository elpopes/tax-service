import { RECEIVE_USERS, RECEIVE_USER, REMOVE_USER } from "./usersActions";

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, [action.user.id]: action.user };
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case REMOVE_USER:
      const newState = { ...state };
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
