import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboards/Dashboard";
import Footer from "./components/Footer/Footer";
import EmailConfirmed from "./components/EmailConfirmation/EmailConfirmed";
import EmailConfirmationFailure from "./components/EmailConfirmation/EmailConfirmationFailure";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const user = useSelector((state) => state.sessions.user);
  const isUserLoggedIn = !!user;

  return (
    <div className="App">
      <Navbar />
      {isUserLoggedIn && <Sidebar />}
      <Routes>
        <Route
          exact
          path="/"
          element={isUserLoggedIn ? <Dashboard /> : <LandingPage />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
        <Route
          path="/email-confirmation-failure"
          element={<EmailConfirmationFailure />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
