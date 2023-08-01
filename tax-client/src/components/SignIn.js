import React, { useState } from "react";
import Modal from "./Modal";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../store/sessions/sessionsOperations";
import {
  getSessionsError,
  selectUser,
} from "../store/sessions/sessionsSelectors";

function SignIn() {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(getSessionsError);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

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

  const showModal = user ? false : true;

  return (
    <div>
      <Modal isVisible={showModal}>
        <h2 className="modal-title">Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="signin-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </label>
          <input type="submit" value="Submit" className="submit-btn" />
        </form>
        <button className="signUp-link" onClick={handleSignUpOpen}>
          Sign Up
        </button>
        <SignUp isVisible={isSignUpVisible} handleClose={handleSignUpClose} />
      </Modal>
    </div>
  );
}

export default SignIn;
