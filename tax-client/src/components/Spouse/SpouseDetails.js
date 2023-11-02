import React from "react";
import { useSelector } from "react-redux";
import AddSpouse from "./AddSpouse";

const SpouseDetails = () => {
  const client = useSelector((state) => state.clientProfile.data);
  const hasSpouse = client && client.spouse;

  return (
    <div>
      {hasSpouse ? (
        <div>
          <h3>Spouse Details</h3>
          <p>
            Name: {client.spouse.first_name} {client.spouse.last_name}
          </p>
          {/* Display other spouse details here */}
        </div>
      ) : (
        <div>
          <h3>Add Spouse Details</h3>
          <AddSpouse />
        </div>
      )}
    </div>
  );
};

export default SpouseDetails;
