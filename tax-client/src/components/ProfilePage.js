import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../store/users/usersSelectors";

function ProfilePage() {
  const user = useSelector(getUser);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    middleName: user.middleName || "",
    dob: "",
    ssnLastFour: "",
    filingStatus: "",
    driverLicenseId: "",
    // Additional fields like number of dependents, marital status, etc.
  });

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      middleName: user.middleName || "",
      dob: "",
      ssnLastFour: "",
      filingStatus: "",
      driverLicenseId: "",
    });
  }, [user, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to backend
  };

  return (
    <div className="profile-page">
      <h1>Create or Update Your Profile</h1>
      <form onSubmit={handleSubmit}>
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
            <option value="married-filing-separately">
              Married Filing Separately
            </option>
            <option value="head-of-household">Head of Household</option>
            <option value="widow">Widow</option>
          </select>
        </label>
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
          SSN Last Four:
          <input
            type="text"
            name="ssnLastFour"
            maxLength="4"
            value={formData.ssnLastFour}
            onChange={handleChange}
          />
        </label>
        {/* Additional fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePage;
