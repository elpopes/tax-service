import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboards/Dashboard";
import Footer from "./components/Footer";
import EmailConfirmed from "./components/EmailConfirmation/EmailConfirmed";
import EmailConfirmationFailure from "./components/EmailConfirmation/EmailConfirmationFailure";
import ProfilePage from "./components/ProfilePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route
            path="/email-confirmation-failure"
            element={<EmailConfirmationFailure />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
