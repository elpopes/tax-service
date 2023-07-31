import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/users/usersOperations";
import Modal from "./Modal";

function SignUp({ isVisible, handleClose }) {
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
    handleClose(); // Close the modal after submitting the form
  };

  return (
    <Modal isVisible={isVisible}>
      <h2 className="modal-title">Sign Up</h2>
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
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="">Select a role...</option>
            <option value="client">Client</option>
            <option value="tax_professional">Tax Professional</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
      <button className="close-btn" onClick={handleClose}>
        X
      </button>
    </Modal>
  );
}

export default SignUp;
