import React from "react";

const userData = {
  name: "John Doe",
  email: "john@example.com",
  dateOfBirth: "2000-01-01",
};

function UserProfile() {
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
