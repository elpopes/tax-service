import config from "../../config";
import {
  uploadDocumentRequest,
  uploadDocumentSuccess,
  uploadDocumentFailure,
  fetchDocumentRequest,
  fetchDocumentSuccess,
  fetchDocumentFailure,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  deleteDocumentFailure,
} from "./documentsActions";

export const uploadDocument = (documentData, clientId) => {
  return async (dispatch, getState) => {
    dispatch(uploadDocumentRequest());

    try {
      const token = getState().sessions.token;

      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/client_documents`,
        {
          method: "POST",
          body: documentData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error uploading document");
      }

      const responseData = await response.json();
      dispatch(uploadDocumentSuccess(responseData));
    } catch (error) {
      dispatch(uploadDocumentFailure(error.toString()));
    }
  };
};

export const fetchDocument =
  (clientId, documentId) => async (dispatch, getState) => {
    dispatch(fetchDocumentRequest());
    const token = getState().sessions.token;

    try {
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/client_documents/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error fetching document");

      const responseData = await response.json();
      dispatch(fetchDocumentSuccess(responseData));
    } catch (error) {
      dispatch(fetchDocumentFailure(error.toString()));
    }
  };

export const deleteDocument =
  (clientId, documentId) => async (dispatch, getState) => {
    dispatch(deleteDocumentRequest());
    const token = getState().sessions.token;

    try {
      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/client_documents/${documentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error deleting document");

      dispatch(deleteDocumentSuccess(documentId));
    } catch (error) {
      dispatch(deleteDocumentFailure(error.toString()));
    }
  };
