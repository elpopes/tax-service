import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/users/usersOperations";
import Modal from "./Modal";

function SignUp({ isVisible }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
      role: role,
    };

    dispatch(createUser(user));
  };

  return (
    <Modal isVisible={isVisible}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
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
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select a role...</option>
            <option value="client">Client</option>
            <option value="tax_professional">Tax Professional</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </Modal>
  );
}

export default SignUp;
