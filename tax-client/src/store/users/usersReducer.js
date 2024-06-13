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
      };
    case RECEIVE_USERS:
      const usersById = action.users.reduce((obj, user) => {
        obj[user.id] = user;
        return obj;
      }, {});
      return {
        ...state,
        byId: { ...state.byId, ...usersById },
      };
    case REMOVE_USER:
      const { [action.userId]: _, ...remainingUsers } = state.byId;
      return {
        ...state,
        byId: remainingUsers,
      };
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
