import { updateClient, updateClientError } from "./clientsActions";
import config from "../../config";

export const updateClientOperation =
  (clientData) => async (dispatch, getState) => {
    try {
      // Extract the user token from the Redux store
      const token = getState().sessions.token;

      // Make the API call to update the client
      const response = await fetch(`${config.API_BASE_URL}/clients/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ client: clientData }),
      });

      const json = await response.json();

      // Check if the update was successful
      if (response.ok) {
        dispatch(updateClient(json));
      } else {
        const errorMessage = json.errors
          ? json.errors.join(", ")
          : "Update failed";
        dispatch(updateClientError(errorMessage));
      }
    } catch (error) {
      console.error("Client update error:", error);
      dispatch(updateClientError(error.message));
    }
  };
