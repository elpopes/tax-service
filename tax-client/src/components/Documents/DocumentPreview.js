import React from "react";

const DocumentPreview = ({ file, base64Data }) => {
  return (
    <div className="file-preview">
      <p>Selected File: {file.name}</p>
      {file.type.startsWith("image/") ? (
        <img
          src={`data:${file.type};base64,${base64Data}`}
          alt="Document Preview"
        />
      ) : (
        <p>Preview not available for this file type.</p>
      )}
    </div>
  );
};

export default DocumentPreview;
