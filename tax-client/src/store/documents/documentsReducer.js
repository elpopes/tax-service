import {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
  FETCH_DOCUMENT_REQUEST,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_REQUEST,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
} from "./documentsActions";

const initialState = {
  uploading: false,
  document: null,
  error: null,
};

export const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        uploading: true,
        error: null,
      };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        uploading: false,
        document: action.payload,
      };
    case UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        uploading: false,
        error: action.payload,
      };
    case FETCH_DOCUMENT_REQUEST:
      return { ...state, fetching: true, error: null };
    case FETCH_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload, fetching: false };
    case FETCH_DOCUMENT_FAILURE:
      return { ...state, fetching: false, error: action.payload };

    case DELETE_DOCUMENT_REQUEST:
      return { ...state, deleting: true, error: null };
    case DELETE_DOCUMENT_SUCCESS:
      return { ...state, document: null, deleting: false };
    case DELETE_DOCUMENT_FAILURE:
      return { ...state, deleting: false, error: action.payload };
    default:
      return state;
  }
};
