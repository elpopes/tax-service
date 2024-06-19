import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {
  updateDependentOperation,
  deleteDependentOperation,
} from "../../store/clients/clientsOperations";
import { selectDependentById } from "../../store/clients/clientsSelectors";
import encryptWithPublicKey from "../../store/utils/encryption";

const EditDependent = ({ clientId, dependentId }) => {
  const dispatch = useDispatch();
  const dependentDetails = useSelector((state) =>
    selectDependentById(state, dependentId)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dependentData, setDependentData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    last_four_ssn: "",
    ssn_encrypted: "",
  });
  const [actualSSN, setActualSSN] = useState("");
  const [formattedSSN, setFormattedSSN] = useState(
    `***-**-${dependentDetails?.last_four_ssn || ""}`
  );

  useEffect(() => {
    if (dependentDetails) {
      setDependentData({
        first_name: dependentDetails.first_name,
        middle_name: dependentDetails.middle_name,
        last_name: dependentDetails.last_name,
        dob: dependentDetails.dob,
      });
      // Set the formatted SSN with a mask and the last four digits
      setFormattedSSN(`***-**-${dependentDetails.last_four_ssn}`);
    }
  }, [dependentDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDependentData({ ...dependentData, [name]: value });
  };

  const handleSSNChange = (e) => {
    const rawSSN = e.target.value.replace(/-/g, "");
    if (rawSSN.length > 9) return;
    setActualSSN(rawSSN);

    const formatted = [rawSSN.slice(0, 3), rawSSN.slice(3, 5), rawSSN.slice(5)]
      .filter(Boolean)
      .join("-");
    setFormattedSSN(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedDependentData = { ...dependentData };

    if (actualSSN.length === 9) {
      try {
        const publicKey = sessionStorage.getItem("public_key");
        const encryptionResult = await encryptWithPublicKey(
          actualSSN,
          publicKey
        );
        updatedDependentData.ssn_encrypted = encryptionResult.ssn_encrypted;
      } catch (error) {
        console.error("Encryption failed", error);
        return;
      }
    }

    dispatch(
      updateDependentOperation(clientId, dependentId, updatedDependentData)
    );
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this dependent's details?"
      )
    ) {
      await dispatch(deleteDependentOperation(clientId, dependentId));
      setIsModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>
        Edit Dependent Details
      </Button>
      <Modal
        isVisible={isModalVisible}
        title="Edit Dependent Details"
        onClose={handleCloseModal}
      >
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
            name="middle_name"
            placeholder="Middle Name"
            value={dependentData.middle_name}
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
            onFocus={(e) => e.target.value === "" && setFormattedSSN("")}
            onBlur={(e) =>
              e.target.value === "" &&
              setFormattedSSN(`***-**-${dependentDetails?.last_four_ssn || ""}`)
            }
          />
          <Button type="submit">Save Changes</Button>
          <Button onClick={handleDelete}>Delete Dependent</Button>
          <Button type="button" onClick={handleCloseModal}>
            Cancel
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditDependent;
