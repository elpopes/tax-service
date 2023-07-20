import React, { useState } from "react";
import Modal from "./Modal";
import SignUp from "./SignUp";

function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSignUpOpen = () => {
    setIsSignUpVisible(true);
  };

  return (
    <div>
      <button onClick={handleOpen}>Sign In</button>
      <Modal isVisible={isVisible}>
        <h2>Sign In</h2>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
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
