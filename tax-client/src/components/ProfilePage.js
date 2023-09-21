import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/users/usersOperations";
import { updateClientOperation } from "../store/clients/clientsOperations"; // New import for updating client
import "./ProfilePage.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.sessions.user.id);
  const user = useSelector((state) => state.users.byId[userId]) || {};

  // Initialize formData with empty or existing user information
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    middleName: user.middleName || "",
    dob: "",
    filingStatus: "",
    driverLicenseId: "",
    numberOfDependents: 0,
    maritalStatus: "",
  });

  const [fullSSN, setFullSSN] = useState("");

  // Update formData whenever the user object changes
  useEffect(() => {
    setFormData({
      ...formData,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      middleName: user.middleName || "",
    });
  }, [user]);

  // Handles changes to most form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles changes to the SSN field
  const handleSSNChange = (e) => {
    const ssn = e.target.value;
    setFullSSN(ssn);
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        fullSSN,
      };

      // Dispatch an action to update the client information
      dispatch(updateClientOperation(payload))
        .then((responseData) => {
          alert("Client information updated successfully");
          // Optionally update the user information in the store
          dispatch(updateUser(responseData.user));
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
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Middle Name:
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
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
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Filing Status:
            <select
              name="filingStatus"
              value={formData.filingStatus}
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
              name="driverLicenseId"
              value={formData.driverLicenseId}
              onChange={handleChange}
            />
          </label>
          <label>
            Number of Dependents:
            <input
              type="number"
              name="numberOfDependents"
              value={formData.numberOfDependents}
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
