import {
  RECEIVE_HOUSEHOLD,
  RECEIVE_HOUSEHOLDS,
  REMOVE_HOUSEHOLD,
} from "./householdsActions";

const householdsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_HOUSEHOLD:
      return { ...state, [action.household.id]: action.household };
    case RECEIVE_HOUSEHOLDS:
      return { ...state, ...action.households };
    case REMOVE_HOUSEHOLD:
      const newState = { ...state };
      delete newState[action.householdId];
      return newState;
    default:
      return state;
  }
};

export default householdsReducer;
