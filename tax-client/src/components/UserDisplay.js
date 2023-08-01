import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/sessions/sessionsSelectors";
import SignOut from "./SignOut";

function UserDisplay() {
  const user = useSelector(selectUser);

  return (
    <div>
      {user ? `Welcome, ${user.email} ` : "Please sign in"}
      {user && <SignOut />}
    </div>
  );
}

export default UserDisplay;
