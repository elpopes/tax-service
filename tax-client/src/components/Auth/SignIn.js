import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SignUp from "./SignUp";
import { clearSessionsError } from "../../store/sessions/sessionsActions";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../store/sessions/sessionsOperations";
import { getSessionsError } from "../../store/sessions/sessionsSelectors";
import Button from "../Button/Button";

function SignIn({ isVisible, handleClose }) {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(getSessionsError);
  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(clearSessionsError());
  };

  const handleSignUpOpen = () => {
    setIsSignUpVisible(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  return (
    <Modal isVisible={isVisible} handleClose={handleClose}>
      <h2 className="modal-title">Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form
        className="signin-form"
        onSubmit={handleSubmit}
        onFocus={handleFocus}
      >
        <label>
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            autoComplete="email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            autoComplete="password"
          />
        </label>
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
      <Button className="signUp-link" onClick={handleSignUpOpen}>
        Sign Up
      </Button>
      <SignUp isVisible={isSignUpVisible} handleClose={handleSignUpClose} />
    </Modal>
  );
}

export default SignIn;
