import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import SignInModal from "./components/SignIn";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <SignInModal />
        <Home />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
