import React from "react";
import "./Navbar.css";
import UserDisplay from "./UserDisplay";
import SearchBar from "./SearchBar";
import ContactInfo from "./ContactInfo";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/sessions/sessionsSelectors";

function Navbar() {
  const user = useSelector(selectUser);

  return (
    <div className="navbar">
      <div className="logo-container">
        <p>Sidney Kahan</p>
      </div>
      <SearchBar />
      <ContactInfo />
      <div className="options-container">
        <Button className="navbar-button">Support</Button>
        {user && <Button className="navbar-button">Notifications</Button>}
      </div>
      <UserDisplay />
    </div>
  );
}

export default Navbar;
