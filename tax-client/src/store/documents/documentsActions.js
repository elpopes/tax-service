export const UPLOAD_DOCUMENT_REQUEST = "UPLOAD_DOCUMENT_REQUEST";
export const UPLOAD_DOCUMENT_SUCCESS = "UPLOAD_DOCUMENT_SUCCESS";
export const UPLOAD_DOCUMENT_FAILURE = "UPLOAD_DOCUMENT_FAILURE";

export const uploadDocumentRequest = () => ({
  type: UPLOAD_DOCUMENT_REQUEST,
});

export const uploadDocumentSuccess = (document) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: document,
});

export const uploadDocumentFailure = (error) => ({
  type: UPLOAD_DOCUMENT_FAILURE,
  payload: error,
});
