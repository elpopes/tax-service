import React from "react";
import SignOut from "./SignOut";
import UserDisplay from "./UserDisplay";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <p>Navbar</p>
        <UserDisplay />
        <SignOut />
      </div>
    );
  }
}

export default Navbar;
