import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import { selectSpouseByClientId } from "../../store/clients/clientsSelectors";
import {
  updateSpouseOperation,
  deleteSpouseOperation,
} from "../../store/clients/clientsOperations";
import encryptWithPublicKey from "../../store/utils/encryption";

const EditSpouse = ({ clientId }) => {
  console.log("ClientId:", clientId);
  const dispatch = useDispatch();
  const spouseDetails = useSelector((state) =>
    selectSpouseByClientId(state, clientId)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [spouseData, setSpouseData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    driver_license_id: "",
    ssn_encrypted: "",
  });
  const [actualSSN, setActualSSN] = useState("");
  const [formattedSSN, setFormattedSSN] = useState("");

  useEffect(() => {
    console.log("Spouse Details from Redux:", spouseDetails);
    if (spouseDetails) {
      setSpouseData(spouseDetails);
    }
  }, [spouseDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "ssn") {
      setSpouseData({ ...spouseData, [name]: value });
    }
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
    let updatedSpouseData = { ...spouseData };

    if (actualSSN.length === 9) {
      const publicKey = sessionStorage.getItem("public_key");
      const encryptionResult = await encryptWithPublicKey(actualSSN, publicKey);
      updatedSpouseData.ssn_encrypted = encryptionResult.ssn_encrypted;
    }

    const { filing_status, last_four_ssn, ...dataWithoutUnneededFields } =
      updatedSpouseData;

    try {
      const actionResult = await dispatch(
        updateSpouseOperation(spouseDetails.id, dataWithoutUnneededFields)
      );

      if (actionResult && actionResult.success && actionResult.spouse) {
        console.log("Update successful. ActionResult:", actionResult);

        setSpouseData(actionResult.spouse);

        setActualSSN("");
        setFormattedSSN("");
        setIsModalVisible(false);
      } else if (actionResult && actionResult.error) {
        console.error("Error in ActionResult:", actionResult.error.message);
        throw new Error(actionResult.error.message);
      } else {
        throw new Error("Update failed due to unknown error");
      }
    } catch (error) {
      console.error("Update spouse failed", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the spouse details?")) {
      await dispatch(deleteSpouseOperation(spouseDetails.id));
      setIsModalVisible(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>
        Edit Spouse Details
      </Button>
      <Modal isVisible={isModalVisible} title="Edit Spouse Details">
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
          <input
            type="text"
            name="driver_license_id"
            placeholder="Driver's License ID"
            value={spouseData.driver_license_id}
            onChange={handleInputChange}
          />

          <p>Last Four SSN: {spouseData.last_four_ssn}</p>
          <input
            type="text"
            name="ssn"
            placeholder="Social Security Number"
            value={formattedSSN}
            onChange={handleSSNChange}
          />

          <Button type="submit">Save Changes</Button>
          <Button type="button" onClick={handleCloseModal}>
            Cancel
          </Button>
        </form>
        <Button onClick={handleDelete}>Delete Spouse</Button>
      </Modal>
    </>
  );
};

export default EditSpouse;
