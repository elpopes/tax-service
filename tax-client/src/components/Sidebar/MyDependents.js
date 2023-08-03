import React, { useState } from "react";

const MyDependents = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="main-component">
      <h3 onClick={handleExpandClick}>My Dependents</h3>
      {expanded && (
        <ul className="subcomponents">
          <li>Dependent 1</li>
          <li>Dependent 2</li>
        </ul>
      )}
    </div>
  );
};

export default MyDependents;
