export const SESSIONS_SIGN_IN = "SESSIONS_SIGN_IN";
export const SESSIONS_SIGN_OUT = "SESSIONS_SIGN_OUT";

export const signIn = ({ user, token, refresh_token }) => ({
  type: SESSIONS_SIGN_IN,
  payload: { user, token, refresh_token },
});

export const signOut = () => ({
  type: SESSIONS_SIGN_OUT,
});
