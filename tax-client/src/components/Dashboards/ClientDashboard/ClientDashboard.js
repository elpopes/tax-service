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
        <h2>Welcome, {user.first_name}!</h2>
      </div>
      <div className="client-dashboard__grid">
        <div className="client-dashboard__item">
          <UserProfile user={user} />
        </div>
        <div className="client-dashboard__item">
          <Notifications user={user} />
        </div>
        <div className="client-dashboard__item">
          <Status user={user} />
        </div>
        <div className="client-dashboard__item">
          <Uploads user={user} />
        </div>
        <div className="client-dashboard__item">
          <History user={user} />
        </div>
        <div className="client-dashboard__item">
          <Support user={user} />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
