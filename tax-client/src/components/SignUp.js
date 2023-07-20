import React from "react";
import Modal from "./Modal";

function SignUp({ isVisible }) {
  return (
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
    </Modal>
  );
}

export default SignUp;
