import React from "react";
import { useSelector } from "react-redux";
import AddDependent from "./AddDependent";
// import EditDependent from "./EditDependent"; // For future implementation
import { selectClientByUserId } from "../../store/clients/clientsSelectors";

const DependentDetails = ({ clientId }) => {
  const userId = useSelector((state) => state.sessions.user.id);
  const client = useSelector((state) => selectClientByUserId(state, userId));

  if (!client) {
    return <div>Loading...</div>;
  }

  //   const dependents = client.dependents;

  return (
    <div>
      <h3>Dependent Details</h3>
      <div>
        <h3>Add Dependent Details</h3>
        <AddDependent clientId={clientId} />
      </div>
    </div>
  );
};

export default DependentDetails;
