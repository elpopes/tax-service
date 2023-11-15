import {
  UPDATE_CLIENT,
  UPDATE_CLIENT_ERROR,
  CREATE_CLIENT,
  DELETE_CLIENT,
  FETCH_CLIENT_PROFILE,
  FETCH_CLIENT_PROFILE_ERROR,
  CREATE_SPOUSE,
  CREATE_SPOUSE_ERROR,
  UPDATE_SPOUSE,
  UPDATE_SPOUSE_ERROR,
  DELETE_SPOUSE,
  DELETE_SPOUSE_ERROR,
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

      if (clientId == null || spouse == null) {
        console.error("Missing clientId or spouse in action payload.");
        return state;
      }

      if (!state.byId[clientId]) {
        console.error(`Client with ID ${clientId} not found in state.`);
        return state;
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [clientId]: {
            ...state.byId[clientId],
            spouse: {
              ...spouse,
              id: spouse.id || state.byId[clientId].spouse_id,
            },
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

    case UPDATE_SPOUSE:
      const updatedClientId = action.payload.clientId;
      console.log("Current state before UPDATE_SPOUSE:", state);
      console.log("Payload received in UPDATE_SPOUSE:", action.payload);

      const newState = {
        ...state,
        byId: {
          ...state.byId,
          [updatedClientId]: {
            ...state.byId[updatedClientId],
            spouse: action.payload.spouse,
          },
        },
        errors: null,
      };

      console.log("New state after UPDATE_SPOUSE:", newState);
      return newState;

    case UPDATE_SPOUSE_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case DELETE_SPOUSE:
      const clientIdWithDeletedSpouse = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [clientIdWithDeletedSpouse]: {
            ...state.byId[clientIdWithDeletedSpouse],
            spouse: null,
          },
        },
        errors: null,
      };

    case DELETE_SPOUSE_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
  }
};

export default clientsReducer;
