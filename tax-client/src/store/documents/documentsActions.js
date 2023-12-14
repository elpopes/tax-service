export const UPLOAD_DOCUMENT_REQUEST = "UPLOAD_DOCUMENT_REQUEST";
export const UPLOAD_DOCUMENT_SUCCESS = "UPLOAD_DOCUMENT_SUCCESS";
export const UPLOAD_DOCUMENT_FAILURE = "UPLOAD_DOCUMENT_FAILURE";

export const FETCH_DOCUMENT_REQUEST = "FETCH_DOCUMENT_REQUEST";
export const FETCH_DOCUMENT_SUCCESS = "FETCH_DOCUMENT_SUCCESS";
export const FETCH_DOCUMENT_FAILURE = "FETCH_DOCUMENT_FAILURE";

export const DELETE_DOCUMENT_REQUEST = "DELETE_DOCUMENT_REQUEST";
export const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";
export const DELETE_DOCUMENT_FAILURE = "DELETE_DOCUMENT_FAILURE";

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

export const fetchDocumentRequest = () => ({
  type: FETCH_DOCUMENT_REQUEST,
});

export const fetchDocumentSuccess = (document) => ({
  type: FETCH_DOCUMENT_SUCCESS,
  payload: document,
});

export const fetchDocumentFailure = (error) => ({
  type: FETCH_DOCUMENT_FAILURE,
  payload: error,
});

export const deleteDocumentRequest = () => ({
  type: DELETE_DOCUMENT_REQUEST,
});

export const deleteDocumentSuccess = (documentId) => ({
  type: DELETE_DOCUMENT_SUCCESS,
  payload: documentId,
});

export const deleteDocumentFailure = (error) => ({
  type: DELETE_DOCUMENT_FAILURE,
  payload: error,
});
