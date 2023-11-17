import React from "react";
import { useSelector } from "react-redux";
import AddDependent from "./AddDependent";
// import EditDependent from "./EditDependent"; // For future implementation
import { selectClientByUserId } from "../../store/clients/clientsSelectors";

const DependentDetails = ({ clientId }) => {
  const client = useSelector((state) => selectClientByUserId(state, clientId));

  function formatDate(dob) {
    const date = new Date(dob);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${month}-${day}-${year}`;
  }

  if (!client) {
    return <div>Loading...</div>;
  }

  const dependents = client.dependents || []; // Ensure dependents is always an array

  return (
    <div>
      <h3>Dependent Details</h3>
      {dependents.map((dependent) => (
        <div key={dependent.id}>
          <p>Name: {dependent.first_name}</p>
          <p>Birthday: {formatDate(dependent.dob)}</p>
        </div>
      ))}
      <div>
        <h3>Add Dependent Details</h3>
        <AddDependent clientId={clientId} />
      </div>
    </div>
  );
};

export default DependentDetails;
