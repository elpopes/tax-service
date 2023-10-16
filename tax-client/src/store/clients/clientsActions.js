// Action types
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const UPDATE_CLIENT_ERROR = "UPDATE_CLIENT_ERROR";
export const CREATE_CLIENT = "CREATE_CLIENT";
export const CREATE_CLIENT_ERROR = "CREATE_CLIENT_ERROR";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_CLIENT_ERROR = "DELETE_CLIENT_ERROR";
export const CLIENT_REQUEST_STARTED = "CLIENT_REQUEST_STARTED";
export const CLIENT_REQUEST_ENDED = "CLIENT_REQUEST_ENDED";
export const FETCH_CLIENT_PROFILE = "FETCH_CLIENT_PROFILE";
export const FETCH_CLIENT_PROFILE_ERROR = "FETCH_CLIENT_PROFILE_ERROR";
export const CREATE_SPOUSE = "CREATE_SPOUSE";
export const CREATE_SPOUSE_ERROR = "CREATE_SPOUSE_ERROR";

// Action creators
export const updateClient = (client) => ({
  type: UPDATE_CLIENT,
  payload: client,
});

export const updateClientError = (error) => ({
  type: UPDATE_CLIENT_ERROR,
  payload: error,
});

export const createClient = (client) => ({
  type: CREATE_CLIENT,
  payload: client,
});

export const createClientError = (error) => ({
  type: CREATE_CLIENT_ERROR,
  payload: error,
});

export const deleteClient = (clientId) => ({
  type: DELETE_CLIENT,
  payload: clientId,
});

export const deleteClientError = (error) => ({
  type: DELETE_CLIENT_ERROR,
  payload: error,
});

export const clientRequestStarted = () => ({
  type: CLIENT_REQUEST_STARTED,
});

export const clientRequestEnded = () => ({
  type: CLIENT_REQUEST_ENDED,
});

export const fetchClientProfile = (clientProfile) => ({
  type: FETCH_CLIENT_PROFILE,
  payload: clientProfile,
});

export const fetchClientProfileError = (error) => ({
  type: FETCH_CLIENT_PROFILE_ERROR,
  payload: error,
});

export const createSpouse = (spouse) => ({
  type: CREATE_SPOUSE,
  payload: spouse,
});

export const createSpouseError = (error) => ({
  type: CREATE_SPOUSE_ERROR,
  payload: error,
});
