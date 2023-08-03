import React from "react";
import "./Navbar.css";
import UserDisplay from "./UserDisplay";
import SearchBar from "./SearchBar";
import ContactInfo from "./ContactInfo";

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo-container">
          <p>Sidney Kahan</p>
        </div>
        <SearchBar />
        <ContactInfo />
        <div className="options-container">
          <p className="option">Support</p>
          <p className="option">Notifications</p>
        </div>
        <UserDisplay />
      </div>
    );
  }
}

export default Navbar;
