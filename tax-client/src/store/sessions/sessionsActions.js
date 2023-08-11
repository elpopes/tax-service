export const SESSIONS_SIGN_IN = "SESSIONS_SIGN_IN";
export const SESSIONS_SIGN_OUT = "SESSIONS_SIGN_OUT";
export const SESSIONS_ERROR = "SESSIONS_ERROR";
export const CLEAR_SESSIONS_ERROR = "CLEAR_SESSIONS_ERROR";

export const clearSessionsError = () => ({
  type: CLEAR_SESSIONS_ERROR,
});

export const signIn = ({ user, token, refresh_token }) => ({
  type: SESSIONS_SIGN_IN,
  payload: { user, token, refresh_token },
});

export const signOut = () => ({
  type: SESSIONS_SIGN_OUT,
});

export const sessionError = (error) => ({
  type: SESSIONS_ERROR,
  payload: error,
});
