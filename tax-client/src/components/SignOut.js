import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../store/sessions/sessionsOperations";
import Button from "./Button";

const SignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;
