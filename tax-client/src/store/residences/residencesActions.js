// Action Types for CRUD Operations
export const FETCH_RESIDENCES = "FETCH_RESIDENCES";
export const FETCH_RESIDENCE = "FETCH_RESIDENCE";
export const CREATE_RESIDENCE = "CREATE_RESIDENCE";
export const UPDATE_RESIDENCE = "UPDATE_RESIDENCE";
export const DELETE_RESIDENCE = "DELETE_RESIDENCE";

// Separate Error Action Types for Each Operation
export const FETCH_RESIDENCES_ERROR = "FETCH_RESIDENCES_ERROR";
export const FETCH_RESIDENCE_ERROR = "FETCH_RESIDENCE_ERROR";
export const CREATE_RESIDENCE_ERROR = "CREATE_RESIDENCE_ERROR";
export const UPDATE_RESIDENCE_ERROR = "UPDATE_RESIDENCE_ERROR";
export const DELETE_RESIDENCE_ERROR = "DELETE_RESIDENCE_ERROR";

// Action Creators for Fetch All Residences
export const fetchResidences = (clientId) => ({
  type: FETCH_RESIDENCES,
  payload: clientId,
});

export const fetchResidencesError = (error) => ({
  type: FETCH_RESIDENCES_ERROR,
  payload: error,
});

// Action Creator for Fetch Single Residence
export const fetchResidence = (clientId, residenceId) => ({
  type: FETCH_RESIDENCE,
  payload: { clientId, residenceId },
});

export const fetchResidenceError = (error) => ({
  type: FETCH_RESIDENCE_ERROR,
  payload: error,
});

// Action Creator for Create
export const createResidence = (clientId, residenceData) => ({
  type: CREATE_RESIDENCE,
  payload: { clientId, residenceData },
});

export const createResidenceError = (error) => ({
  type: CREATE_RESIDENCE_ERROR,
  payload: error,
});

// Action Creator for Update
export const updateResidence = (clientId, residenceId, residenceData) => ({
  type: UPDATE_RESIDENCE,
  payload: { clientId, residenceId, residenceData },
});

export const updateResidenceError = (error) => ({
  type: UPDATE_RESIDENCE_ERROR,
  payload: error,
});

// Action Creator for Delete
export const deleteResidence = (clientId, residenceId) => ({
  type: DELETE_RESIDENCE,
  payload: { clientId, residenceId },
});

export const deleteResidenceError = (error) => ({
  type: DELETE_RESIDENCE_ERROR,
  payload: error,
});
