import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { createDependentOperation } from "../../store/clients/clientsOperations";
import { selectDependentErrors } from "../../store/clients/clientsSelectors";
import encryptWithPublicKey from "../../store/utils/encryption";

const AddDependent = ({ clientId }) => {
  const dispatch = useDispatch();
  const dependentErrors = useSelector(selectDependentErrors);
  const [actualSSN, setActualSSN] = useState("");
  const [formattedSSN, setFormattedSSN] = useState("");
  const [dependentData, setDependentData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    ssn_encrypted: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDependentData({ ...dependentData, [name]: value });
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
      const updatedDependentData = { ...dependentData, ssn_encrypted };
      await dispatch(createDependentOperation(clientId, updatedDependentData));
      setIsModalVisible(false);
      // Add logic to handle errors
    } catch (error) {
      console.error("There was a problem:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Add Dependent</Button>
      <Modal isVisible={isModalVisible} title="Add Dependent">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={dependentData.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={dependentData.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="middle_name"
            placeholder="Middle Name"
            value={dependentData.middle_name}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={dependentData.dob}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ssn"
            placeholder="Social Security Number"
            value={formattedSSN}
            onChange={handleSSNChange}
          />
          <Button type="submit">Add Dependent</Button>
        </form>
        {dependentErrors && (
          <div className="error-messages">
            {Array.isArray(dependentErrors)
              ? dependentErrors.join(", ")
              : dependentErrors}
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddDependent;
