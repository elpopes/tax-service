import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/users/usersOperations";
import Modal from "./Modal";

function SignUp({ isVisible, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [ssnLastFour, setSsnLastFour] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
      role: role,
      ssn_last_four: ssnLastFour,
    };

    dispatch(createUser(user));
    handleClose();
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
        <label>
          Last Four Digits of SSN:
          <input
            type="text"
            name="ssnLastFour"
            maxLength="4"
            value={ssnLastFour}
            onChange={(e) => setSsnLastFour(e.target.value)}
            className="form-input"
          />
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
