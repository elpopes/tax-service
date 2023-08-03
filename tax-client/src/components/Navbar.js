import React from "react";
import "./Navbar.css";
import UserDisplay from "./UserDisplay";
import SearchBar from "./SearchBar";
import ContactInfo from "./ContactInfo";
import Button from "./Button";

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
          <Button>Support</Button>
          <Button>Notifications</Button>
        </div>
        <UserDisplay />
      </div>
    );
  }
}

export default Navbar;
