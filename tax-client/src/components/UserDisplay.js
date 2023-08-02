import React from "react";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../store/sessions/sessionsSelectors";
import { isTokenValid } from "../store/utils/auth";
import SignOut from "./SignOut";
import SignIn from "./SignIn";

function UserDisplay() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const isValidToken = token ? isTokenValid(token) : false;

  return (
    <div>
      {isValidToken && user ? `Welcome, ${user.email} ` : <SignIn />}
      {isValidToken && user && <SignOut />}
    </div>
  );
}

export default UserDisplay;
