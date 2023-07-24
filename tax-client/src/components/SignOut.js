import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../store/sessions/sessionsOperations";

const SignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
