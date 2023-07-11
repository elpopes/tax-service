import React, { useState } from "react";
import Modal from "./Modal";

function SignIn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
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
      </Modal>
    </div>
  );
}

export default SignIn;
