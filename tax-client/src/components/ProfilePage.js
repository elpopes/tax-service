import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateClientOperation } from "../store/clients/clientsOperations";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import Button from "./Button";
import encryptWithPublicKey from "../store/utils/encryption";

function ProfilePage() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.sessions.user?.id);
  const client = useSelector((state) => state.clients.byId[user_id]) || {};
  const navigate = useNavigate();

  const [actualSSN, setActualSSN] = useState("");
  const [formattedSSN, setFormattedSSN] = useState("");
  const [form_data, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    filing_status: "",
    driver_license_id: "",
    number_of_dependents: 0,
    ssn: "",
  });

  useEffect(() => {
    if (client.last_four_ssn) {
      const lastFourSSN = client.last_four_ssn;
      const maskedSSN = `***-**-${lastFourSSN}`;
      setFormattedSSN(maskedSSN);
      setActualSSN(`000000000${lastFourSSN}`.slice(-9));
    }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...form_data,
      [name]: value,
    });
  };

  const handleSSNChange = (e) => {
    const rawSSN = e.target.value.replace(/-/g, "");
    if (rawSSN.length > 9) return;
    const formatted = [
      rawSSN.substring(0, 3),
      rawSSN.substring(3, 5),
      rawSSN.substring(5, 9),
    ]
      .filter(Boolean)
      .join("-");
    setActualSSN(rawSSN);
    setFormattedSSN(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (actualSSN.length !== 9) {
      alert("Please enter a valid 9-digit SSN.");
      return;
    }
    try {
      const publicKey = sessionStorage.getItem("public_key");
      const { ssn_encrypted } = await encryptWithPublicKey(
        actualSSN,
        publicKey
      );
      const updatedFormData = { ...form_data, ssn_encrypted };
      dispatch(updateClientOperation(updatedFormData))
        .then(() => {
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
        <div className="form-section">
          <h2>Basic Information</h2>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={form_data.first_name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={form_data.last_name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Middle Name:
            <input
              type="text"
              name="middle_name"
              value={form_data.middle_name}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Social Security Number:
            <input
              type="text"
              name="ssn"
              value={formattedSSN}
              placeholder="Please enter your SSN"
              onChange={handleSSNChange}
            />
          </label>
          <label>
            Filing Status:
            <select
              name="filing_status"
              value={form_data.filing_status}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </label>
          <label>
            Number of Dependents:
            <input
              type="number"
              name="number_of_dependents"
              value={form_data.number_of_dependents}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
      <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
    </div>
  );
}

export default ProfilePage;
