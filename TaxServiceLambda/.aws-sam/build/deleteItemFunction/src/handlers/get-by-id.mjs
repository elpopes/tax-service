import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
  });

export const getItemHandler = async (event) => {
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

    const { Body } = await s3Client.send(new GetObjectCommand(params));

    if (Body instanceof Readable) {
      const base64data = await streamToString(Body);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Document retrieved successfully",
          data: base64data,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error: Document is not a readable stream.",
        }),
      };
    }
  } catch (err) {
    console.error("Error retrieving document", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving document",
        error: err.message,
      }),
    };
  }
};
