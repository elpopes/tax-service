import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const pdfjsVersion = "2.16.105";

const DocumentPreview = ({ file, base64Data }) => {
  const pdfFile = `data:${file.type};base64,${base64Data}`;

  return (
    <div className="file-preview">
      <p>Selected File: {file.name}</p>
      {file.type.startsWith("image/") ? (
        <img src={pdfFile} alt="Document Preview" className="preview-image" />
      ) : file.type === "application/pdf" ? (
        <div className="preview-pdf">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={pdfFile} />
          </Worker>
        </div>
      ) : (
        <p>Preview not available for this file type.</p>
      )}
    </div>
  );
};

export default DocumentPreview;
