import React from "react";
import useUser from "../hooks/useUser";

function Dashboard() {
  const user = useUser();

  switch (user.role) {
    case "client":
      return <ClientDashboard user={user} />;
    case "Preparer":
      return <PreparerDashboard user={user} />;
    case "Admin":
      return <AdminDashboard user={user} />;
    default:
      return <div>Invalid user role</div>;
  }
}

export default Dashboard;
