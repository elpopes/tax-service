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
    filingStatus: "",
    driverLicenseId: "",
    numberOfDependents: 0,
    maritalStatus: "",
  });

  const [fullSSN, setFullSSN] = useState("");

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      middleName: user.middleName || "",
    });
  }, [user, formData]);

  useEffect(() => {
    const lastFour = fullSSN.slice(-4);
    setFormData({
      ...formData,
      ssnLastFour: lastFour,
    });
  }, [fullSSN, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSSNChange = (e) => {
    const ssn = e.target.value;
    setFullSSN(ssn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form to the backend
  };

  return (
    <div className="profile-page">
      <h1>Create or Update Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Existing Fields */}
        {/* ... */}

        <label>
          Full SSN:
          <input
            type="password"
            name="fullSSN"
            value={fullSSN}
            onChange={handleSSNChange}
            required
          />
        </label>

        <label>
          SSN Last Four:
          <input type="text" readOnly value={formData.ssnLastFour} />
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

        <label>
          Marital Status:
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePage;
