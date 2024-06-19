import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {
  updateResidence,
  deleteResidence,
} from "../../store/residences/residencesOperations";
import { selectResidenceById } from "../../store/residences/residencesSelectors";

const EditResidence = ({ clientId, residenceId }) => {
  const dispatch = useDispatch();
  const residenceDetails = useSelector((state) =>
    selectResidenceById(state, clientId, residenceId)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  useEffect(() => {
    if (residenceDetails) {
      setResidenceData(residenceDetails);
    }
  }, [residenceDetails]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResidenceData({
      ...residenceData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateResidence(clientId, residenceId, residenceData));
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this residence?")) {
      await dispatch(deleteResidence(clientId, residenceId));
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>
        Edit Residence Details
      </Button>
      <Modal
        isVisible={isModalVisible}
        title="Edit Residence Details"
        onClose={handleCloseModal}
      >
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
          <div>
            <label>
              <input
                type="checkbox"
                name="is_primary_residence"
                checked={residenceData.is_primary_residence}
                onChange={handleInputChange}
              />
              Primary Residence
            </label>
          </div>
          <input
            type="text"
            name="property_type"
            placeholder="Property Type"
            value={residenceData.property_type}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ownership_status"
            placeholder="Ownership Status"
            value={residenceData.ownership_status}
            onChange={handleInputChange}
          />
          <Button type="submit">Save Changes</Button>
          <Button onClick={handleDelete}>Delete Residence</Button>
          <Button type="button" onClick={handleCloseModal}>
            Cancel
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditResidence;
