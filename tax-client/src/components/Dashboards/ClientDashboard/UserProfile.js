import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClientProfileOperation } from "../../../store/clients/clientsOperations";
import { Link } from "react-router-dom";
import {
  selectClientById,
  selectClientErrors,
} from "../../../store/clients/clientsSelectors";

function UserProfile() {
  const dispatch = useDispatch();
  const clientError = useSelector(selectClientErrors);

  useEffect(() => {
    dispatch(fetchClientProfileOperation());
  }, [dispatch]);

  const clientData = useSelector((state) =>
    selectClientById(state, state.sessions.user.id)
  );

  if (clientError) {
    return <div>Error: {clientError}</div>;
  }

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const fullName = [
    clientData.first_name,
    clientData.middle_name,
    clientData.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div>
        <strong>Name: </strong>
        {fullName || "Not provided"}
      </div>
      <div>
        <strong>Email: </strong>
        {clientData.email || "Not provided"}
      </div>
      <div>
        <strong>Date of Birth: </strong>
        {clientData.date_of_birth || (
          <span style={{ color: "red" }}>Please update your profile</span>
        )}
      </div>
      <Link to="/profile">Edit Profile</Link>
      {!clientData.date_of_birth && (
        <div className="alert">
          <h2>You need to update your profile</h2>
          <Link to="/profile">Click here to update your profile</Link>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
