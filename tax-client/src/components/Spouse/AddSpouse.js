import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import { addSpouseOperation } from "../../store/clients/clientsOperations";
import { selectSpouseErrors } from "../../store/clients/clientsSelectors";
import encryptWithPublicKey from "../../store/utils/encryption";
import { FILING_STATUS_MAP } from "../../store/utils/constants";

const AddSpouse = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.sessions.user.id);
  const spouseErrors = useSelector(selectSpouseErrors);

  const [actualSSN, setActualSSN] = useState("");
  const [formattedSSN, setFormattedSSN] = useState("");
  const [spouseData, setSpouseData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    filing_status: "",
    driver_license_id: "",
    number_of_dependents: 0,
    ssn_encrypted: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpouseData({
      ...spouseData,
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
      const updatedSpouseData = { ...spouseData, ssn_encrypted };
      dispatch(addSpouseOperation(currentUserId, updatedSpouseData));
    } catch (error) {
      console.error("There was a problem:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Add Spouse</Button>
      <Modal isVisible={isModalVisible} title="Add Spouse">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={spouseData.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={spouseData.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="middle_name"
            placeholder="Middle Name"
            value={spouseData.middle_name}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={spouseData.dob}
            onChange={handleInputChange}
          />

          <select
            name="filing_status"
            value={spouseData.filing_status}
            onChange={handleInputChange}
            required
          >
            <option value="">--Please choose an option--</option>
            <option value={FILING_STATUS_MAP["Married Filing Separately"]}>
              Married Filing Separately
            </option>
            <option value={FILING_STATUS_MAP["Married Filing Jointly"]}>
              Married Filing Jointly
            </option>
          </select>

          <input
            type="text"
            name="ssn"
            placeholder="Social Security Number"
            value={formattedSSN}
            onChange={handleSSNChange}
          />

          <Button type="submit">Add Spouse</Button>
        </form>
        {Array.isArray(spouseErrors) ? (
          <div>{spouseErrors.join(", ")}</div>
        ) : (
          <div>{spouseErrors}</div>
        )}
      </Modal>
    </>
  );
};

export default AddSpouse;
