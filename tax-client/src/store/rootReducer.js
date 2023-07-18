import { combineReducers } from "redux";
import usersReducer from "./users/usersReducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
