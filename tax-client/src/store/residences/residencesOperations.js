import axios from "axios";
import {
  CREATE_RESIDENCE,
  UPDATE_RESIDENCE,
  DELETE_RESIDENCE,
  FETCH_RESIDENCE,
  CREATE_RESIDENCE_ERROR,
  UPDATE_RESIDENCE_ERROR,
  DELETE_RESIDENCE_ERROR,
  FETCH_RESIDENCE_ERROR,
} from "./residencesActions";
import config from "../../config";

// Operation to create a residence
export const createResidence =
  (clientId, residenceData) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/clients/${clientId}/residences`, // Prepend the base URL
        residenceData
      );
      dispatch({
        type: CREATE_RESIDENCE,
        payload: { clientId, residence: response.data },
      });
    } catch (error) {
      dispatch({ type: CREATE_RESIDENCE_ERROR, payload: error.message });
    }
  };

// Operation to fetch the primary residence
export const fetchResidences = (clientId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${config.API_BASE_URL}/clients/${clientId}/residences`
    );
    const residences = response.data;
    dispatch({
      type: FETCH_RESIDENCE,
      payload: { clientId, residences },
    });
  } catch (error) {
    dispatch({ type: FETCH_RESIDENCE_ERROR, payload: error.message });
  }
};

// Operation to update the primary residence
export const updatePrimaryResidence =
  (clientId, residenceId, residenceData) => async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/clients/${clientId}/residences/${residenceId}`,
        residenceData
      );
      dispatch({
        type: UPDATE_RESIDENCE,
        payload: { clientId, residence: response.data },
      });
    } catch (error) {
      dispatch({ type: UPDATE_RESIDENCE_ERROR, payload: error.message });
    }
  };

// Operation to delete a residence
export const deleteResidence = (clientId, residenceId) => async (dispatch) => {
  try {
    await axios.delete(`/api/clients/${clientId}/residences/${residenceId}`);
    dispatch({ type: DELETE_RESIDENCE, payload: { clientId, residenceId } });
  } catch (error) {
    dispatch({ type: DELETE_RESIDENCE_ERROR, payload: error.message });
  }
};
