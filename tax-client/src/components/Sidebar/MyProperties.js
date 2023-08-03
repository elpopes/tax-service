import React, { useState } from "react";

const MyProperties = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="main-component">
      <h3 onClick={handleExpandClick}>My Properties</h3>
      {expanded && (
        <ul className="subcomponents">
          <li>Property 1</li>
          <li>Property 2</li>
        </ul>
      )}
    </div>
  );
};

export default MyProperties;
