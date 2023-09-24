import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClient } from "../../../store/clients/clientsOperations";
import { Link } from "react-router-dom";
import {
  selectClientById,
  selectClientErrors,
} from "../../../store/clients/clientsSelectors";

function UserProfile() {
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.sessions.user.id);
  const clientError = useSelector(selectClientErrors);

  useEffect(() => {
    if (!clientId) {
      return;
    }
    dispatch(fetchClient(clientId));
  }, [dispatch, clientId]);

  const clientData = useSelector((state) => selectClientById(state, clientId));
  if (clientError) {
    return <div>Error: {clientError}</div>;
  }

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const fullName = [
    clientData.firstName,
    clientData.middleName,
    clientData.lastName,
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
        {clientData.dateOfBirth || (
          <span style={{ color: "red" }}>Please update your profile</span>
        )}
      </div>
      <Link to="/profile">Edit Profile</Link>
      {!clientData.dateOfBirth && (
        <div className="alert">
          <h2>You need to update your profile</h2>
          <Link to="/profile">Click here to update your profile</Link>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
