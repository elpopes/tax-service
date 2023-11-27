import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddResidence from "./AddResidence";
// import EditResidence from "./EditResidence";
import { fetchPrimaryResidence } from "../../store/residences/residencesOperations";
import { selectResidenceForClient } from "../../store/residences/residencesSelectors";

const ResidenceDetails = ({ clientId }) => {
  const dispatch = useDispatch();
  const residences =
    useSelector((state) => selectResidenceForClient(state, clientId)) || [];

  useEffect(() => {
    dispatch(fetchPrimaryResidence(clientId));
  }, [clientId, dispatch]);

  // Handle loading state if needed
  if (!residences.length) {
    return <div>Loading residences...</div>;
  }

  return (
    <div>
      <h3>Residence Details</h3>
      {residences.map((residence) => (
        <div key={residence.id}>
          <p>Address: {residence.street_address}</p>
          {/* Display other residence details here */}
          {/* <EditResidence clientId={clientId} residenceId={residence.id} /> */}
        </div>
      ))}
      <div>
        <h3>Add Residence</h3>
        <AddResidence clientId={clientId} />
      </div>
    </div>
  );
};

export default ResidenceDetails;
