import { combineReducers } from "redux";
import usersReducer from "./users/usersReducer";
import householdsReducer from "./households/householdsReducer";
import dependentsReducer from "./dependents/dependentsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  households: householdsReducer,
  dependents: dependentsReducer,
});

export default rootReducer;
