import { signIn, signOut, sessionError } from "./sessionsActions";
import config from "../../config";

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      if (response.ok) {
        const { user, token, refresh_token } = await response.json();
        dispatch(signIn({ user, token, refresh_token }));
      } else {
        throw new Error("Sign in failed");
      }
    } catch (error) {
      dispatch(sessionError(error.message));
    }
  };

export const signOutUser = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const refreshToken = state.sessions.refresh_token;

    const response = await fetch(`${config.API_BASE_URL}/sessions`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      dispatch(signOut());
    } else {
      throw new Error("Sign out failed");
    }
  } catch (error) {
    dispatch(sessionError(error.message));
  }
};
