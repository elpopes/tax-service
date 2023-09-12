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

  if (!userData.hasClientProfile) {
    return (
      <div className="alert">
        <h2>You need to create your profile</h2>
        <Link to="/profile">
          Click here to create or update your profile
        </Link>{" "}
        {/* Link to ProfilePage */}
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div>
        <strong>Name: </strong>
        {userData.name}
      </div>
      <div>
        <strong>Email: </strong>
        {userData.email}
      </div>
      <div>
        <strong>Date of Birth: </strong>
        {userData.dateOfBirth}
      </div>
      <Link to="/profile">Edit Profile</Link>{" "}
      {/* Link to ProfilePage for editing */}
    </div>
  );
}

export default UserProfile;
