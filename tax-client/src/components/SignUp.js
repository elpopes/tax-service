import React, { useState } from "react";
import Modal from "./Modal";

function SignUp() {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Sign Up</button>
      <Modal isVisible={isVisible}>
        <h2>Sign Up</h2>
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

export default SignUp;
