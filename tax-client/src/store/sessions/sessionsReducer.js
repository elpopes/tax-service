import {
  SESSIONS_SIGN_IN,
  SESSIONS_SIGN_OUT,
  SESSIONS_ERROR,
} from "./sessionsActions";

const initialState = {
  user: null,
  token: null,
  refresh_token: null,
  error: null,
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSIONS_SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refresh_token: action.payload.refresh_token,
      };
    case SESSIONS_SIGN_OUT:
      return initialState;
    case SESSIONS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sessionsReducer;
