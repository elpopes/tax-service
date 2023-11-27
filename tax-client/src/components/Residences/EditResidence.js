import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateResidence } from "../../store/residences/residencesOperations";

const EditResidence = ({ clientId, residenceId, initialData }) => {
  const [residenceData, setResidenceData] = useState(initialData);
  const dispatch = useDispatch();

  useEffect(() => {
    setResidenceData(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResidenceData({ ...residenceData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateResidence(clientId, residenceId, residenceData));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for residence data */}
      <input
        type="text"
        name="street_address"
        value={residenceData.street_address}
        onChange={handleInputChange}
      />
      {/* Add other fields for editing the residence */}

      <button type="submit">Update Residence</button>
    </form>
  );
};

export default EditResidence;
