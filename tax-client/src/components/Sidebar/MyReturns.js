import React, { useState } from "react";

const MyReturns = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h3 onClick={handleExpandClick}>My Returns</h3>
      {expanded && (
        <ul>
          <li>View Return</li>
          <li>Digital Signature</li>
          {/* Add more subitems as needed */}
        </ul>
      )}
    </div>
  );
};

export default MyReturns;
