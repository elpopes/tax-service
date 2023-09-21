import { combineReducers } from "redux";
import usersReducer from "./users/usersReducer";
import householdsReducer from "./households/householdsReducer";
import dependentsReducer from "./dependents/dependentsReducer";
import sessionsReducer from "./sessions/sessionsReducer";
import clientsReducer from "./clients/clientsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  households: householdsReducer,
  dependents: dependentsReducer,
  sessions: sessionsReducer,
  clients: clientsReducer,
});

export default rootReducer;
