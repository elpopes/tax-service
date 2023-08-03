import React, { useState } from "react";

const BankProducts = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h3 onClick={handleExpandClick}>Bank Products</h3>
      {expanded && (
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          {/* Add more subitems as needed */}
        </ul>
      )}
    </div>
  );
};

export default BankProducts;
