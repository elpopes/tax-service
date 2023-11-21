import { combineReducers } from "redux";
import usersReducer from "./users/usersReducer";
// import householdsReducer from "./households/householdsReducer";
// import dependentsReducer from "./dependents/dependentsReducer";
import sessionsReducer from "./sessions/sessionsReducer";
import clientsReducer from "./clients/clientsReducer";
import residencesReducer from "./residences/residencesReducer";

const appReducer = combineReducers({
  users: usersReducer,
  //   households: householdsReducer,
  //   dependents: dependentsReducer,
  residences: residencesReducer,
  sessions: sessionsReducer,
  clients: clientsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
