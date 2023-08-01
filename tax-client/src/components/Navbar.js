import React from "react";
import "./Navbar.css";
import UserDisplay from "./UserDisplay";

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <p>Sidney Kahan</p>
        <div className="contact-info">
          <p>1153 Beach Channel Dr, Far Rockaway, NY 11691</p>
          <p>(718) 327-0006</p>
          <p>sidney.kahan@gmail.com</p>
        </div>
        <UserDisplay />
      </div>
    );
  }
}

export default Navbar;
