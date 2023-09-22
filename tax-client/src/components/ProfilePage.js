import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/users/usersOperations";
import { updateClientOperation } from "../store/clients/clientsOperations";
import "./ProfilePage.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.sessions.user.id);
  const user = useSelector((state) => state.users.byId[user_id]) || {};
  const client_id = useSelector((state) => state.client.id);
  const client = useSelector((state) => state.clients.byId[client_id]) || {};

  // Initialize form_data with empty or existing user information
  const [form_data, setFormData] = useState({
    first_name: user.firstName || "",
    last_name: user.lastName || "",
    middle_name: user.middleName || "",
    dob: "",
    filing_status: "",
    driver_license_id: "",
    number_of_dependents: 0,
  });

  // Update form_data whenever the user object changes
  useEffect(() => {
    setFormData({
      ...form_data,
      first_name: user.first_name || client.first_name || "",
      last_name: user.last_name || client.last_name || "",
      middle_name: user.middle_name || client.middle_name || "",
      dob: client.dob || "",
      filing_status: client.filing_status || "",
      driver_license_id: client.driver_license_id || "",
      number_of_dependents: client.number_of_dependents || 0,
    });
  }, [user, client]);

  // Handles changes to most form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...form_data,
      [name]: value,
    });
  };

  // Handles changes to the SSN field
  //   const handleSSNChange = (e) => {
  //     const ssn = e.target.value;
  //     setFullSSN(ssn);
  //   };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form_data,
        // ssn,
      };

      // Dispatch an action to update the client information
      dispatch(updateClientOperation(payload))
        .then((response_data) => {
          alert("Client information updated successfully");
          console.log("Response data:", response_data);
          dispatch(updateUser(response_data.user));
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
    </div>
  );
}

export default ProfilePage;
