import React from "react";
import Navbar from "./components/Navbar";
import SignInModal from "./components/SignIn";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <h1>Test outside Provider</h1>
      <div className="App">
        <Navbar />
        <SignInModal />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
