import React from "react";
import { useSelector } from "react-redux";
import { selectClientByUserId } from "../../store/clients/clientsSelectors";
import SpouseDetails from "../Spouse/SpouseDetails";
// import DependentDetails from "../Dependent/DependentDetails";
function Household() {
  const userId = useSelector((state) => state.sessions.user.id);
  const client = useSelector((state) => selectClientByUserId(state, userId));

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Household</h2>

      <div>
        <SpouseDetails clientId={client.id} spouse={client.spouse} />
      </div>

      <div></div>

      <div>
        <h3>Residence</h3>
        {/* Residence details or Edit Residence Button */}
      </div>
    </div>
  );
}

export default Household;
