import {
  updateClient,
  updateClientError,
  createClient,
  deleteClient,
  clientRequestStarted,
  clientRequestEnded,
  fetchClientProfile,
  fetchClientProfileError,
  createSpouse,
  createSpouseError,
} from "./clientsActions";
import config from "../../config";

const normalizeClient = (rawClient) => {
  return {
    id: rawClient.id, // this is actually the user_id from the profile API
    user_id: rawClient.client_id,
    first_name: rawClient.first_name,
    middle_name: rawClient.middle_name || "",
    last_name: rawClient.last_name,
    email: rawClient.email,
    dob: rawClient.dob || null,
    filing_status: rawClient.filing_status,
    driver_license_id: rawClient.driver_license_id,
    number_of_dependents: rawClient.number_of_dependents,
    last_four_ssn: rawClient.last_four_ssn,
    // any other fields you might want to normalize
  };
};

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
        const normalizedClient = normalizeClient(json);
        console.log("Response OK, dispatching fetchClientProfile");
        dispatch(fetchClientProfile(normalizedClient));
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
    const normalizedClient = normalizeClient(client);
    dispatch(updateClient(normalizedClient));
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
    const normalizedClient = normalizeClient(newClient);
    dispatch(createClient(normalizedClient));
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
  console.log("Starting client profile fetch");
  dispatch(clientRequestStarted());

  try {
    const token = getState().sessions.token;
    console.log("Token:", token);

    const response = await fetch(`${config.API_BASE_URL}/clients/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response:", response);

    const json = await response.json();
    console.log("JSON Response:", json);

    dispatch(clientRequestEnded());

    if (response.ok) {
      console.log("Response OK, dispatching fetchClientProfile");
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

export const addSpouseOperation =
  (clientId, spouseData) => async (dispatch, getState) => {
    try {
      dispatch(clientRequestStarted());
      const token = getState().sessions.token;
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/create_spouse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ spouse: spouseData }),
        }
      );

      const json = await response.json();

      dispatch(clientRequestEnded());

      if (response.ok) {
        dispatch(createSpouse(json));
      } else {
        const errorMessage = json.errors
          ? json.errors.join(", ")
          : "Spouse creation failed";
        dispatch(createSpouseError(errorMessage));
      }
    } catch (error) {
      dispatch(clientRequestEnded());

      console.error("Spouse creation error:", error);
      dispatch(createSpouseError(error.message));
    }
  };
