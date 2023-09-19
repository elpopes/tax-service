import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../store/users/usersOperations";
import { Link } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching user profile from UserProfile...");
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const userId = useSelector((state) => state.sessions.user.id);
  const usersState = useSelector((state) => state.users);
  const userData = usersState.byId[userId] || {};

  const fullName = [userData.firstName, userData.middleName, userData.lastName]
    .filter(Boolean) // removes null or undefined items
    .join(" ");

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div>
        <strong>Name: </strong>
        {fullName || "Not provided"}
      </div>
      <div>
        <strong>Email: </strong>
        {userData.email || "Not provided"}
      </div>
      <div>
        <strong>Date of Birth: </strong>
        {userData.dateOfBirth || (
          <span style={{ color: "red" }}>Please update your profile</span>
        )}
      </div>
      <Link to="/profile">Edit Profile</Link>
      {!userData.dateOfBirth && (
        <div className="alert">
          <h2>You need to update your profile</h2>
          <Link to="/profile">Click here to update your profile</Link>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
