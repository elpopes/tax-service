import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import SignInModal from "./components/SignIn";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Sidebar /> {/* Render the Sidebar component */}
        <SignInModal />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
