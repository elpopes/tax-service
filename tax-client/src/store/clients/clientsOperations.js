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
  updateSpouse,
  updateSpouseError,
  deleteSpouse,
  deleteSpouseError,
  createDependent,
  createDependentError,
  updateDependent,
  updateDependentError,
  deleteDependent,
  deleteDependentError,
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
        method: "PATCH",
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
        dispatch(createSpouse({ clientId, spouse: json.spouse }));
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

export const updateSpouseOperation =
  (clientId, spouseData) => async (dispatch, getState) => {
    dispatch(clientRequestStarted());
    const token = getState().sessions.token;

    try {
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/update_spouse`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ spouse: spouseData }),
        }
      );

      const json = await response.json();
      console.log("Response JSON:", json); // Log the response JSON
      dispatch(clientRequestEnded());

      if (response.ok) {
        dispatch(updateSpouse(clientId, json.spouse));
        console.log("Dispatched updateSpouse:", json.spouse); // Log success case
        return { success: true, spouse: json.spouse }; // Return success result
      } else {
        const errorMessage = json.errors
          ? json.errors.join(", ")
          : "Update spouse failed";
        dispatch(updateSpouseError(errorMessage));
        console.log("Dispatched updateSpouseError:", errorMessage); // Log error case
        return { success: false, error: errorMessage }; // Return error result
      }
    } catch (error) {
      dispatch(clientRequestEnded());
      console.error("Update spouse error:", error);
      dispatch(updateSpouseError(error.message));
      return { success: false, error: error.message }; // Return error result
    }
  };

export const deleteSpouseOperation =
  (clientId) => async (dispatch, getState) => {
    dispatch(clientRequestStarted());
    const token = getState().sessions.token;

    try {
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/destroy_spouse`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(clientRequestEnded());

      if (response.ok) {
        dispatch(deleteSpouse(clientId));
      } else {
        const errorMessage = await response.text();
        dispatch(deleteSpouseError(errorMessage));
      }
    } catch (error) {
      dispatch(clientRequestEnded());
      console.error("Delete spouse error:", error);
      dispatch(deleteSpouseError(error.message));
    }
  };

export const createDependentOperation =
  (clientId, dependentData) => async (dispatch, getState) => {
    dispatch(clientRequestStarted());
    const token = getState().sessions.token;
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/create_dependent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ dependent: dependentData }),
        }
      );

      if (response.ok) {
        const newDependent = await response.json();
        dispatch(createDependent(clientId, newDependent));
      } else {
        const errorMessage = await response.text();
        dispatch(createDependentError(errorMessage));
      }
    } catch (error) {
      console.error("Create dependent error:", error);
      dispatch(createDependentError(error.message));
    } finally {
      dispatch(clientRequestEnded());
    }
  };

export const updateDependentOperation =
  (clientId, dependentId, dependentData) => async (dispatch, getState) => {
    dispatch(clientRequestStarted());
    const token = getState().sessions.token;
    try {
      console.log("Updating dependent:", {
        clientId,
        dependentId,
        dependentData,
      });

      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/update_dependent`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dependent: dependentData,
            dependent_id: dependentId,
          }),
        }
      );

      if (response.ok) {
        const updatedDependentData = await response.json();
        dispatch(updateDependent(clientId, dependentId, updatedDependentData));
      } else {
        const errorMessage = await response.text();
        dispatch(updateDependentError(errorMessage));
      }
    } catch (error) {
      console.error("Update dependent error:", error);
      dispatch(updateDependentError(error.message));
    } finally {
      dispatch(clientRequestEnded());
    }
  };

export const deleteDependentOperation =
  (clientId, dependentId) => async (dispatch, getState) => {
    dispatch(clientRequestStarted());
    const token = getState().sessions.token;
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/dependents/${dependentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        dispatch(deleteDependent(clientId, dependentId));
      } else {
        const errorMessage = await response.text();
        dispatch(deleteDependentError(errorMessage));
      }
    } catch (error) {
      console.error("Delete dependent error:", error);
      dispatch(deleteDependentError(error.message));
    } finally {
      dispatch(clientRequestEnded());
    }
  };
