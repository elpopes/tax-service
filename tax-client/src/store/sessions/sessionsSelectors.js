export const selectUser = (state) => state.sessions.user;
export const selectToken = (state) => state.sessions.token;
export const selectRefreshToken = (state) => state.sessions.refresh_token;
export const getSessionsError = (state) => state.sessions.error;
