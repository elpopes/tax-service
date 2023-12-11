import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const deleteItemHandler = async (event) => {
  try {
    const documentKey = event.documentKey;

    if (!documentKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bad request - Missing document key" }),
      };
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: documentKey,
    };

    await s3Client.send(new DeleteObjectCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Document deleted successfully" }),
    };
  } catch (err) {
    console.error("Error deleting document", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error deleting document",
        error: err.message,
      }),
    };
  }
};
