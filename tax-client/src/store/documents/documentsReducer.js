import {
  UPLOAD_DOCUMENT_REQUEST,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAILURE,
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
    default:
      return state;
  }
};
