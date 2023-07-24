import React, { useState } from "react";
import Modal from "./Modal";
import SignUp from "./SignUp";
import { useDispatch } from "react-redux";
import { signInUser } from "../store/sessions/sessionsOperations";

function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSignUpOpen = () => {
    setIsSignUpVisible(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signInUser({ email, password }));
    setIsVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Sign In</button>
      <Modal isVisible={isVisible}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleSignUpOpen}>Sign Up</button>
        <SignUp isVisible={isSignUpVisible} />
      </Modal>
    </div>
  );
}

export default SignIn;
