import {
  RECEIVE_DEPENDENT,
  RECEIVE_DEPENDENTS,
  REMOVE_DEPENDENT,
} from "./dependentsActions";

const dependentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DEPENDENT:
      return { ...state, [action.dependent.id]: action.dependent };
    case RECEIVE_DEPENDENTS:
      return { ...state, ...action.dependents };
    case REMOVE_DEPENDENT:
      const newState = { ...state };
      delete newState[action.dependentId];
      return newState;
    default:
      return state;
  }
};

export default dependentsReducer;
