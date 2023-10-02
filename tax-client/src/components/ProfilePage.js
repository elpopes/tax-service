import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateClientOperation } from "../store/clients/clientsOperations";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import Button from "./Button";
import encryptWithPublicKey from "../store/utils/encryption";

function ProfilePage() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.sessions.user.id);
  const client = useSelector((state) => state.clients.byId[user_id]) || {};
  const navigate = useNavigate();
  const returnToDashboard = () => navigate("/");

  const [form_data, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    filing_status: "",
    driver_license_id: "",
    number_of_dependents: 0,
  });

  useEffect(() => {
    setFormData({
      first_name: client.first_name || "",
      last_name: client.last_name || "",
      middle_name: client.middle_name || "",
      dob: client.dob || "",
      filing_status: client.filing_status || "",
      driver_license_id: client.driver_license_id || "",
      number_of_dependents: client.number_of_dependents || 0,
    });
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...form_data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Encrypt sensitive data before sending it
      const publicKey = sessionStorage.getItem("public_key");
      const encryptedSSN = await encryptWithPublicKey(form_data.ssn, publicKey);

      const encryptedFormData = {
        ...form_data,
        ssn: encryptedSSN, // Replace the plain SSN with the encrypted one
      };

      dispatch(updateClientOperation(encryptedFormData))
        .then((response_data) => {
          alert("Client information updated successfully");
        })
        .catch((error) => {
          alert(`Failed to update client information: ${error}`);
        });
    } catch (error) {
      console.error("There was a problem:", error);
      alert("An error occurred while updating client information.");
    }
  };

  return (
    <div className="profile-page">
      <h1>Create or Update Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={form_data.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={form_data.last_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Middle Name:
            <input
              type="text"
              name="middle_name"
              value={form_data.middle_name}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Financial Information */}
        <div className="form-section">
          <h2>Financial Information</h2>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={form_data.dob}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Social Security Number:
            <input
              type="password" // Hide the SSN visually
              name="ssn"
              value={form_data.ssn}
              onChange={handleChange}
            />
          </label>
          <label>
            Filing Status:
            <select
              name="filing_status"
              value={form_data.filing_status}
              onChange={handleChange}
              required
            >
              <option value="">--Please choose an option--</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              {/* ... other options */}
            </select>
          </label>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h2>Additional Information</h2>
          <label>
            Driver's License ID:
            <input
              type="text"
              name="driver_license_id"
              value={form_data.driver_license_id}
              onChange={handleChange}
            />
          </label>
          <label>
            Number of Dependents:
            <input
              type="number"
              name="number_of_dependents"
              value={form_data.number_of_dependents}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
      <Button onClick={returnToDashboard}>Go to Dashboard</Button>
    </div>
  );
}

export default ProfilePage;
