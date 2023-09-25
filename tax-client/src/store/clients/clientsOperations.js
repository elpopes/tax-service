import {
  updateClient,
  updateClientError,
  createClient,
  deleteClient,
  clientRequestStarted,
  clientRequestEnded,
  fetchClientProfile,
  fetchClientProfileError,
} from "./clientsActions";
import config from "../../config";

export const updateClientOperation =
  (clientData) => async (dispatch, getState) => {
    try {
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

export const fetchClient = (clientId) => async (dispatch) => {
  dispatch(clientRequestStarted());
  const res = await fetch(`${config.API_BASE_URL}/clients/${clientId}`);
  dispatch(clientRequestEnded());
  if (res.ok) {
    const client = await res.json();
    dispatch(updateClient(client));
  }
};

export const createClientOperation = (client) => async (dispatch) => {
  dispatch(clientRequestStarted());
  const res = await fetch(`${config.API_BASE_URL}/clients`, {
    method: "POST",
    body: JSON.stringify({ client }),
    headers: { "Content-Type": "application/json" },
  });
  dispatch(clientRequestEnded());
  if (res.ok) {
    const newClient = await res.json();
    dispatch(createClient(newClient));
  }
};

export const deleteClientOperation = (clientId) => async (dispatch) => {
  dispatch(clientRequestStarted());
  const res = await fetch(`${config.API_BASE_URL}/clients/${clientId}`, {
    method: "DELETE",
  });
  dispatch(clientRequestEnded());
  if (res.ok) {
    dispatch(deleteClient(clientId));
  }
};

export const fetchClientProfileOperation = () => async (dispatch, getState) => {
  dispatch(clientRequestStarted());
  try {
    const token = getState().sessions.token;
    const response = await fetch(`${config.API_BASE_URL}/clients/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    dispatch(clientRequestEnded());

    if (response.ok) {
      dispatch(fetchClientProfile(json));
    } else {
      const errorMessage = json.errors
        ? json.errors.join(", ")
        : "Fetch profile failed";
      dispatch(fetchClientProfileError(errorMessage));
    }
  } catch (error) {
    dispatch(clientRequestEnded());
    console.error("Fetch profile error:", error);
    dispatch(fetchClientProfileError(error.message));
  }
};
