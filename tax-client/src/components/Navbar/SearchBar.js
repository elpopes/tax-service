import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    );
  }
}

export default SearchBar;
