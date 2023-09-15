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

  const userData = useSelector((state) => state.users);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div>
        <strong>Name: </strong>
        {userData.name || "Not provided"}
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
      <Link to="/profile">Edit Profile</Link>{" "}
      {/* Link to ProfilePage for editing */}
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
