import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const putItemHandler = async (event) => {
  try {
    const documentData = event.documentData;
    const documentKey = event.documentKey;

    if (!documentData || !documentKey) {
      console.error("Missing documentData or documentKey in event");
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Bad request - Missing documentData or documentKey",
        }),
      };
    }

    // Convert the base64-encoded document data back to binary
    const decodedDocument = Buffer.from(documentData, "base64");

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: documentKey,
      Body: decodedDocument,
    };

    await s3Client.send(new PutObjectCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Document uploaded successfully" }),
    };
  } catch (err) {
    console.error("Error uploading document", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error uploading document",
        error: err.message,
      }),
    };
  }
};
