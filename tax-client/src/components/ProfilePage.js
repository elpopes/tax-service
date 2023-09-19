import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.css";

function ProfilePage() {
  // Grab the userId from the sessions state slice
  const userId = useSelector((state) => state.sessions.user.id);
  // Use the userId to retrieve the user object
  const user = useSelector((state) => state.users.byId[userId]) || {};

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
        {/* Rest of your form elements */}
        {/* ... */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePage;
