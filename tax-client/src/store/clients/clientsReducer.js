import {
  UPDATE_CLIENT,
  UPDATE_CLIENT_ERROR,
  CREATE_CLIENT,
  DELETE_CLIENT,
  FETCH_CLIENT_PROFILE,
  FETCH_CLIENT_PROFILE_ERROR,
  CREATE_SPOUSE,
  CREATE_SPOUSE_ERROR,
} from "./clientsActions";

const initialState = {
  byId: {},
  errors: null,
  spouseErrors: null,
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENT_PROFILE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            ...action.payload,
          },
        },
        errors: null,
      };
    case FETCH_CLIENT_PROFILE_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
        errors: null,
      };
    case UPDATE_CLIENT_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CREATE_CLIENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case CREATE_SPOUSE:
      const { clientId, spouse } = action.payload;

      // Log the action payload and current state for debugging
      console.log("Action Payload:", action.payload);
      console.log("Current State:", state);

      // Ensure that clientId and spouse exist in the payload
      if (clientId == null || spouse == null) {
        console.error("Missing clientId or spouse in action payload.");
        return state; // Return current state if required data is missing
      }

      // Ensure that a client with the given clientId already exists in the state
      if (!state.byId[clientId]) {
        console.error(`Client with ID ${clientId} not found in state.`);
        return state; // Return current state if client not found
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [clientId]: {
            ...state.byId[clientId],
            spouse: spouse,
          },
        },
        spouseErrors: null,
      };
    case CREATE_SPOUSE_ERROR:
      return {
        ...state,
        spouseErrors: action.payload,
      };
    case DELETE_CLIENT:
      const newClientsState = { ...state };
      delete newClientsState.byId[action.payload.id];
      return newClientsState;
    default:
      return state;
  }
};

export default clientsReducer;
