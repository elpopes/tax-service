import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
// import SignInModal from "./components/SignIn";
import Dashboard from "./components/Dashboards/Dashboard";
// import Home from "./components/Home";
import Footer from "./components/Footer";
import EmailConfirmed from "./components/EmailConfirmation/EmailConfirmed";
import EmailConfirmationFailure from "./components/EmailConfirmation/EmailConfirmationFailure";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Sidebar />
        {/* <SignInModal /> */}
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route
            path="/email-confirmation-failure"
            element={<EmailConfirmationFailure />}
          />
        </Routes>
        {/* <Dashboard /> */}
        {/* <Home /> */}
        <Footer />
      </div>
    </>
  );
}

export default App;
