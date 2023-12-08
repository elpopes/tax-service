import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const putItemHandler = async (event) => {
  if (event.httpMethod && event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    let documentData, documentKey;

    if (!event.body) {
      console.error("Event body is undefined");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bad request - Missing event body" }),
      };
    }
    // Safely parsing the event body
    try {
      const parsedBody = JSON.parse(event.body);
      documentData = parsedBody.documentData;
      documentKey = parsedBody.documentKey;
    } catch (parseError) {
      console.error("Error parsing event body:", event.body);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Bad request - Invalid JSON",
          error: parseError.message,
        }),
      };
    }

    // Convert the base64-encoded document data back to binary
    const decodedDocument = Buffer.from(documentData, "base64");

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: documentKey,
      Body: decodedDocument,
      // ContentType removed to allow S3 to infer it
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
