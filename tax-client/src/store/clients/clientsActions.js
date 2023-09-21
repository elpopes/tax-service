// Action types
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const UPDATE_CLIENT_ERROR = "UPDATE_CLIENT_ERROR";

// Action creators
export const updateClient = (client) => ({
  type: UPDATE_CLIENT,
  payload: client,
});

export const updateClientError = (error) => ({
  type: UPDATE_CLIENT_ERROR,
  payload: error,
});
