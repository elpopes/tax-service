import React, { useState } from "react";

const BankProducts = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="main-component">
      <h3 onClick={handleExpandClick}>Bank Products</h3>
      {expanded && (
        <ul className="subcomponents">
          <li>Product 1</li>
          <li>Product 2</li>
        </ul>
      )}
    </div>
  );
};

export default BankProducts;
