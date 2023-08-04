import React from "react";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";
import Status from "./Status";
import Uploads from "./Uploads";
import History from "./History";
import Support from "./Support";
import "./ClientDashboard.css";

const ClientDashboard = ({ user }) => {
  return (
    <div className="client-dashboard">
      <div className="client-dashboard__header">
        <h2>Welcome, {user.email}</h2>
      </div>
      <div className="client-dashboard__top-row">
        <UserProfile user={user} />
        <Notifications user={user} />
      </div>
      <div className="client-dashboard__middle-row">
        <Status user={user} />
        <Uploads user={user} />
      </div>
      <div className="client-dashboard__bottom-row">
        <History user={user} />
        <Support user={user} />
      </div>
    </div>
  );
};

export default ClientDashboard;
