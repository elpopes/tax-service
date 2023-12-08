import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import Button from "../Button";
import { uploadDocument } from "../../store/documents/documentsOperations";
import { selectUploadError } from "../../store/documents/documentsSelectors";

const UploadDocument = ({ clientId }) => {
  const dispatch = useDispatch();
  const uploadError = useSelector(selectUploadError);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("client_document[document]", selectedFile);

    try {
      await dispatch(uploadDocument(formData, clientId));
      setIsModalVisible(false);
      setSelectedFile(null);
      // Add logic to update the UI/notify the user of success
    } catch (error) {
      console.error("There was a problem uploading the document:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Upload Document</Button>
      <Modal isVisible={isModalVisible} title="Upload Document">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          {selectedFile && (
            <div className="file-preview">
              <p>Selected File: {selectedFile.name}</p>
              {/* Implement more sophisticated preview if needed */}
            </div>
          )}
          <Button type="submit">Upload</Button>
        </form>
        {uploadError && (
          <div className="error-messages">
            {Array.isArray(uploadError) ? uploadError.join(", ") : uploadError}
          </div>
        )}
      </Modal>
    </>
  );
};

export default UploadDocument;
