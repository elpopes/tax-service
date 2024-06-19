import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { uploadDocument } from "../../store/documents/documentsOperations";
import { selectUploadError } from "../../store/documents/documentsSelectors";
import DocumentPreview from ".//DocumentPreview";

const UploadDocument = ({ clientId }) => {
  const dispatch = useDispatch();
  const uploadError = useSelector(selectUploadError);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [taxYear, setTaxYear] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [base64Data, setBase64Data] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Keep the file object for file name
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const base64String = loadEvent.target.result;
        const base64Encoded = base64String.split(",")[1];
        setBase64Data(base64Encoded);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !base64Data) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("client_document[base64]", base64Data);
    formData.append("client_document[document_type]", documentType);
    formData.append("client_document[tax_year]", taxYear);
    formData.append("client_document[file_name]", selectedFile.name);

    try {
      await dispatch(uploadDocument(formData, clientId));
      setIsModalVisible(false);
      setSelectedFile(null);
      setBase64Data(""); // Reset base64 data
    } catch (error) {
      console.error("There was a problem uploading the document:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
    setDocumentType("");
    setTaxYear("");
    setBase64Data("");
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Upload Document</Button>
      <Modal isVisible={isModalVisible} title="Upload Document">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Document Type</option>
            <option value="id_card">ID Card</option>
            <option value="w2">W2</option>
            <option value="expenses">Expenses</option>
            <option value="ss_card">SS Card</option>
            <option value="stock_earnings_1099b">Stock Earnings 1099b</option>
            <option value="crypto_earnings">Crypto Earnings</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Tax Year"
            value={taxYear}
            onChange={(e) => setTaxYear(e.target.value)}
          />
          {selectedFile && (
            <DocumentPreview file={selectedFile} base64Data={base64Data} />
          )}
          <Button type="submit">Upload</Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
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
