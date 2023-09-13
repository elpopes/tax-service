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
  }, [user]);

  useEffect(() => {
    const lastFour = fullSSN.slice(-4);
    setFormData({
      ...formData,
      ssnLastFour: lastFour,
    });
  }, [fullSSN]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/createOrUpdateClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers as required
        },
        body: JSON.stringify({
          ...formData,
          fullSSN, // Should be handled securely
        }),
      });

      if (response.ok) {
        alert("Client information updated successfully");
      } else {
        alert("Failed to update client information");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
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
            <option value="marriedFilingSeparately">
              Married Filing Separately
            </option>
            <option value="headOfHousehold">Head of Household</option>
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
