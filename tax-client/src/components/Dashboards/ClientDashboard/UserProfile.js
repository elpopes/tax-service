import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../store/users/usersOperations";

function UserProfile() {
  const dispatch = useDispatch();

  // When the component mounts, fetch the user profile
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Retrieve the user data from the Redux store
  const userData = useSelector((state) => state.users.current); // Adjust this selector based on your Redux state shape

  if (!userData) {
    return <div>Loading...</div>;
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
    </div>
  );
}

export default UserProfile;
