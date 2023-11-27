import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import Button from "../Button";
import { updateResidence } from "../../store/residences/residencesOperations";
import { selectResidenceById } from "../../store/residences/residencesSelectors";

const EditResidence = ({ clientId, residenceId }) => {
  const dispatch = useDispatch();
  const residenceDetails = useSelector((state) =>
    selectResidenceById(state, residenceId)
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
    const { name, value } = e.target;
    setResidenceData({ ...residenceData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateResidence(clientId, residenceId, residenceData));
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          {/* Input fields for residence data */}
          <input
            type="text"
            name="street_address"
            placeholder="Street Address"
            value={residenceData.street_address}
            onChange={handleInputChange}
          />
          {/* Add other input fields for residence details */}
          {/* ... */}
          <Button type="submit">Save Changes</Button>
          <Button type="button" onClick={handleCloseModal}>
            Cancel
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditResidence;
