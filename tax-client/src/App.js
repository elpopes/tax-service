import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import SignInModal from "./components/SignIn";
import Dashboard from "./components/Dashboards/Dashboard";
// import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        {/* <Sidebar /> */}
        <SignInModal />
        <Dashboard />
        {/* <Home /> */}
        <Footer />
      </div>
    </>
  );
}

export default App;
