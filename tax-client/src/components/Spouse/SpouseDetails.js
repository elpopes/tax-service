import React from "react";
import { useSelector } from "react-redux";
import AddSpouse from "./AddSpouse";
import EditSpouse from "./EditSpouse";
import { selectClientByUserId } from "../../store/clients/clientsSelectors";

const SpouseDetails = ({ clientId, spouse }) => {
  const userId = useSelector((state) => state.sessions.user.id);
  const client = useSelector((state) => selectClientByUserId(state, userId));

  console.log("Client:", client);

  return (
    <div>
      {spouse ? (
        <div>
          <h3>Spouse Details:</h3>
          <p>
            Name: {spouse.first_name} {spouse.last_name}
          </p>
          <EditSpouse clientId={clientId} />
        </div>
      ) : (
        <div>
          <h3>Add Spouse Details</h3>
          <AddSpouse clientId={clientId} />
        </div>
      )}
    </div>
  );
};

export default SpouseDetails;
