import React from "react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../store/sessions/sessionsOperations";
import Button from "./Button";

const SignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;
