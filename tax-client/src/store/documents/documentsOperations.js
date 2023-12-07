import config from "../../config";
import {
  uploadDocumentRequest,
  uploadDocumentSuccess,
  uploadDocumentFailure,
} from "./documentsActions";

export const uploadDocument = (documentData, clientId) => {
  return async (dispatch) => {
    dispatch(uploadDocumentRequest());

    try {
      const formData = new FormData();
      for (const key in documentData) {
        formData.append(key, documentData[key]);
      }

      const response = await fetch(
        `${config.apiBaseUrl}/clients/${clientId}/client_documents`,
        {
          method: "POST",
          body: formData,
          headers: {},
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
