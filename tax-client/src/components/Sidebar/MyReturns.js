import React, { useState } from "react";

const MyReturns = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="main-component">
      <h3 onClick={handleExpandClick}>My Returns</h3>
      {expanded && (
        <ul className="subcomponents">
          <li>View Return</li>
          <li>Digital Signature</li>
        </ul>
      )}
    </div>
  );
};

export default MyReturns;
