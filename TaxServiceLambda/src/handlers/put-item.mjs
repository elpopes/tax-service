// Import required AWS SDK clients and commands for Node.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Create a new S3 client
const s3Client = new S3Client({ region: process.env.AWS_REGION });

/**
 * A Lambda function that uploads a document to an S3 bucket.
 */
export const uploadDocumentHandler = async (event) => {
  // Check for HTTP POST method (if triggered via API Gateway)
  if (event.httpMethod && event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    // Parse the event body to get the document data and key
    const { documentData, documentKey } = JSON.parse(event.body);

    // Convert the base64-encoded document data back to binary
    const decodedDocument = Buffer.from(documentData, "base64");

    // Parameters for the S3 putObject command
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: documentKey,
      Body: decodedDocument,
      ContentType: "application/pdf", // Change as per document type
    };

    // Upload the document to S3
    const data = await s3Client.send(new PutObjectCommand(params));

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Document uploaded successfully", data }),
    };
  } catch (err) {
    console.error("Error uploading document", err);

    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error uploading document",
        error: err.message,
      }),
    };
  }
};
