import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/sessions/sessionsSelectors";
import SignOut from "./SignOut";
import SignIn from "./SignIn";

function UserDisplay() {
  const user = useSelector(selectUser);

  return (
    <div>
      {user ? `Welcome, ${user.email} ` : <SignIn />}
      {user && <SignOut />}
    </div>
  );
}

export default UserDisplay;
