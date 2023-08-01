import React from "react";
import { useSelector } from "react-redux";
import { getSessionsUser } from "../store/sessions/sessionsSelectors";

function UserDisplay() {
  const user = useSelector(getSessionsUser);

  return <div>{user ? `Welcome, ${user.email}` : "Please sign in"}</div>;
}

export default UserDisplay;
