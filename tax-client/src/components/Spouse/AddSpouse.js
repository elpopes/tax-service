import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import { addSpouseOperation } from "../../store/clients/clientsOperations";
import { selectSpouseErrors } from "../../store/clients/clientsSelectors";

const AddSpouse = () => {
  const dispatch = useDispatch();
  const spouseErrors = useSelector(selectSpouseErrors);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpouseData({
      ...spouseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSpouseOperation(spouseData));
  };

  return (
    <Modal title="Add Spouse">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={spouseData.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={spouseData.last_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="middle_name"
          placeholder="Middle Name"
          value={spouseData.middle_name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={spouseData.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="filing_status"
          placeholder="Filing Status"
          value={spouseData.filing_status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="driver_license_id"
          placeholder="Driver License ID"
          value={spouseData.driver_license_id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="number_of_dependents"
          placeholder="Number of Dependents"
          value={spouseData.number_of_dependents}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ssn_encrypted"
          placeholder="Social Security Number (Encrypted)"
          value={spouseData.ssn_encrypted}
          onChange={handleChange}
        />
        <Button type="submit">Add Spouse</Button>
      </form>
      {spouseErrors && <div>{spouseErrors.join(", ")}</div>}
    </Modal>
  );
};

export default AddSpouse;
