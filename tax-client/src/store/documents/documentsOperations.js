import config from "../../config";
import {
  uploadDocumentRequest,
  uploadDocumentSuccess,
  uploadDocumentFailure,
} from "./documentsActions";

export const uploadDocument = (documentData, clientId) => {
  return async (dispatch, getState) => {
    dispatch(uploadDocumentRequest());

    try {
      const token = getState().sessions.token;

      const formData = new FormData();
      formData.append("document", documentData);

      const response = await fetch(
        `${config.API_BASE_URL}/clients/${clientId}/client_documents`,
        {
          method: "POST",
          body: formData,
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
