import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  showDocument,
  selectDocument,
  selectFetching,
} from "../redux/documents";

const DocumentViewer = ({ clientId, documentId }) => {
  const dispatch = useDispatch();
  const documentData = useSelector(selectDocument);
  const isFetching = useSelector(selectFetching);
  const [documentContent, setDocumentContent] = useState(null);

  useEffect(() => {
    dispatch(showDocument(clientId, documentId));
  }, [dispatch, clientId, documentId]);

  useEffect(() => {
    if (documentData && documentData.data && documentData.fileName) {
      const mimeType = getMimeType(documentData.fileName);
      const base64Data = documentData.data;
      const blob = new Blob([base64Data], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);
      setDocumentContent(blobUrl);
    }
  }, [documentData]);

  const getMimeType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const mimeTypes = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return mimeTypes[extension] || "application/octet-stream";
  };

  if (isFetching) {
    return <p>Loading document...</p>;
  }

  return (
    <div>
      {documentContent ? (
        <iframe
          src={documentContent}
          title="Document Viewer"
          width="100%"
          height="600px"
        ></iframe>
      ) : (
        <p>Document not found.</p>
      )}
    </div>
  );
};

export default DocumentViewer;
