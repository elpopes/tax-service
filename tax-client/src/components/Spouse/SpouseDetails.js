import React from "react";
import { useSelector } from "react-redux";
import AddSpouse from "./AddSpouse";

const SpouseDetails = () => {
  const userId = useSelector((state) => state.sessions.user.id);
  const client = useSelector((state) => state.clients.byId[userId]);
  const spouse = client && client.spouse;

  return (
    <div>
      {spouse ? (
        <div>
          <h3>Spouse Details:</h3>
          <p>
            Name: {spouse.first_name} {spouse.last_name}
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
