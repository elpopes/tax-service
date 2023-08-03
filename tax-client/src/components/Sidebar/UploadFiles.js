import React, { useState } from "react";

const UploadFiles = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h3 onClick={handleExpandClick}>Upload Files</h3>
      {expanded && (
        <ul>
          <li>Upload W2s</li>
        </ul>
      )}
    </div>
  );
};

export default UploadFiles;
