import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import { selectSpouseByClientId } from "../../store/clients/clientsSelectors";
import {
  updateSpouseOperation,
  deleteSpouseOperation,
} from "../../store/clients/clientsOperations";
import { FILING_STATUS_MAP } from "../../store/utils/constants";

const EditSpouse = ({ clientId }) => {
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
    filing_status: "",
    driver_license_id: "",
    number_of_dependents: 0,
    ssn_encrypted: "",
  });

  useEffect(() => {
    if (spouseDetails) {
      setSpouseData(spouseDetails);
    }
  }, [spouseDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpouseData({
      ...spouseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateSpouseOperation(clientId, spouseData));
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the spouse details?")) {
      await dispatch(deleteSpouseOperation(clientId));
      setIsModalVisible(false);
    }
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

          <select
            name="filing_status"
            value={spouseData.filing_status}
            onChange={handleInputChange}
            required
          >
            <option value="">--Please choose an option--</option>
            <option value={FILING_STATUS_MAP.single}>Single</option>
            <option value={FILING_STATUS_MAP.married_joint}>
              Married Filing Jointly
            </option>
            <option value={FILING_STATUS_MAP.married_separate}>
              Married Filing Separately
            </option>
            <option value={FILING_STATUS_MAP.head_of_household}>
              Head of Household
            </option>
            <option value={FILING_STATUS_MAP.widower}>
              Qualifying Widow(er)
            </option>
          </select>

          <p>Last Four SSN: {spouseData.last_four_ssn}</p>

          <Button type="submit">Save Changes</Button>
        </form>
        <Button onClick={handleDelete}>Delete Spouse</Button>
      </Modal>
    </>
  );
};

export default EditSpouse;
