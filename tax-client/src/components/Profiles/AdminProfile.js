import React from "react";

function AdminProfile() {
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
  };

  return (
    <div>
      <h1>Admin Profile</h1>
      <p>Name: {admin.name}</p>
      <p>Email: {admin.email}</p>
    </div>
  );
}

export default AdminProfile;
