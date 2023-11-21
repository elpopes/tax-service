import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import Button from "../Button";
import { createResidence } from "../../store/residences/residencesOperations";

const AddResidence = ({ clientId }) => {
  const dispatch = useDispatch();
  const [residenceData, setResidenceData] = useState({
    street_address: "",
    apartment_number: "",
    city: "",
    state: "",
    zip_code: "",
    county: "",
    is_primary_residence: false,
    property_type: "",
    ownership_status: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResidenceData({ ...residenceData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setResidenceData({ ...residenceData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createResidence(clientId, residenceData));
    setIsModalVisible(false);
    // Add logic to reset form and handle errors
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Add Residence</Button>
      <Modal isVisible={isModalVisible} title="Add Residence">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="street_address"
            placeholder="Street Address"
            value={residenceData.street_address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apartment_number"
            placeholder="Apartment Number"
            value={residenceData.apartment_number}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={residenceData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={residenceData.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            value={residenceData.zip_code}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="county"
            placeholder="County"
            value={residenceData.county}
            onChange={handleInputChange}
          />
          <label>
            <input
              type="checkbox"
              name="is_primary_residence"
              checked={residenceData.is_primary_residence}
              onChange={handleCheckboxChange}
            />
            Is Primary Residence
          </label>
          {/* Add inputs for property_type and ownership_status */}
          <Button type="submit">Add Residence</Button>
        </form>
        {/* Display errors */}
      </Modal>
    </>
  );
};

export default AddResidence;
