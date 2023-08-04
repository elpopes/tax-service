import React from "react";
import { useSelector } from "react-redux";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import PreparerDashboard from "./PreparerDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const user = useSelector((state) => state.sessions.user);

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
