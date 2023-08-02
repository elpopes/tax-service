import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/sessions/sessionsSelectors";
import { isTokenValid } from "../store/utils/auth";
import SignOut from "./SignOut";
import SignIn from "./SignIn";

function UserDisplay() {
  const user = useSelector(selectUser);
  const token = useSelector((state) => state.session.token);

  const isUserLoggedIn = user && isTokenValid(token);

  return (
    <div>
      {isUserLoggedIn ? `Welcome, ${user.email} ` : <SignIn />}
      {isUserLoggedIn && <SignOut />}
    </div>
  );
}

export default UserDisplay;
