import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/user/actions";
import Modal from "./Modal";

function SignUp({ isVisible }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };
    dispatch(createUser(user));
  };

  return (
    <Modal isVisible={isVisible}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </Modal>
  );
}

export default SignUp;
