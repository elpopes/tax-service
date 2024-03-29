import { signIn, sessionError } from "./sessionsActions";
import config from "../../config";
import { persistor } from "../../store";

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
    const token = state.sessions.token;

    const response = await fetch(`${config.API_BASE_URL}/sessions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      dispatch({ type: "RESET_STORE" }); // Reset the Redux store
      persistor.purge(); // Clear the persisted state
    } else {
      throw new Error("Sign out failed");
    }
  } catch (error) {
    dispatch(sessionError(error.message));
  }
};
