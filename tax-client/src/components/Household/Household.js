import React from "react";
import { useSelector } from "react-redux";
import { selectClientByUserId } from "../../store/clients/clientsSelectors";
import SpouseDetails from "../Spouse/SpouseDetails";
import DependentDetails from "../Dependents/DependentDetails";
import AddResidence from "../Residences/AddResidence";
import ResidenceDetails from "../Residences/ResidenceDetails";
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

      <div>
        <DependentDetails clientId={client.id} />
      </div>

      <div>
        <ResidenceDetails clientId={client.id} />
        <AddResidence clientId={client.id} />
      </div>
    </div>
  );
}

export default Household;
