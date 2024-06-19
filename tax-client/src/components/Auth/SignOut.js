import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../store/sessions/sessionsOperations";
import Button from "../Button/Button";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await dispatch(signOutUser());
    navigate("/");
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;
