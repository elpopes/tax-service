import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../store/users/usersOperations";
import { clearRegistrationError } from "../store/users/usersActions";
import Modal from "./Modal";

function SignUp({ isVisible, handleClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [ssnLastFour, setSsnLastFour] = useState("");
  const dispatch = useDispatch();

  const registrationError = useSelector((state) => state.users.error);

  useEffect(() => {
    return () => {
      dispatch(clearRegistrationError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      email: email,
      password: password,
      role: role,
      ssn_last_four: ssnLastFour,
      dob: dob,
    };

    try {
      await dispatch(createUser(user));
      handleClose();
    } catch (error) {
      console.error("Registration error: ", error);
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <h2 className="modal-title">Sign Up</h2>
      {registrationError && (
        <div className="error-message">{registrationError}</div>
      )}
      <form className="signin-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <label>
          Middle Name:
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="form-input"
          />
        </label>
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
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="form-input"
            required
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
