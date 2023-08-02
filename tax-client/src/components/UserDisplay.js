import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken } from "../store/sessions/sessionsSelectors";
import { isTokenValid } from "../store/utils/auth";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import { signOut } from "../store/sessions/sessionsActions";

function UserDisplay() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const isValidToken = token ? isTokenValid(token) : false;

  useEffect(() => {
    if (!isValidToken && user) {
      dispatch(signOut());
    }
  }, [isValidToken, user, dispatch]);

  return (
    <div>
      {isValidToken && user ? `Welcome, ${user.email} ` : <SignIn />}
      {isValidToken && user && <SignOut />}
    </div>
  );
}

export default UserDisplay;
