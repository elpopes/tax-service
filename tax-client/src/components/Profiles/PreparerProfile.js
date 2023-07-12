import React from "react";

function PreparerProfile() {
  const preparer = {
    name: "Sidney Kahan",
    email: "Sidney@SidneyKahan.com",
  };

  return (
    <div>
      <h1>Preparer Profile</h1>
      <p>Name: {preparer.name}</p>
      <p>Email: {preparer.email}</p>
    </div>
  );
}

export default PreparerProfile;
