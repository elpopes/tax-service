import { pemToArrayBuffer, arrayBufferToBase64 } from "./dataConversion";

async function encryptWithPublicKey(text, publicKey) {
  // Convert the PEM public key to an ArrayBuffer
  const publicKeyArrayBuffer = pemToArrayBuffer(publicKey);

  // Import the public key
  const importedPublicKey = await window.crypto.subtle.importKey(
    "spki",
    publicKeyArrayBuffer,
    { name: "RSA-OAEP", hash: "SHA-1" }, // Changed from SHA-256 to SHA-1
    false,
    ["encrypt"]
  );

  // Convert the text data to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Encrypt the data using the imported public key
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    importedPublicKey,
    data
  );

  // Convert the encrypted data to Base64 and return
  return {
    ssn_encrypted: arrayBufferToBase64(encryptedData),
  };
}

export default encryptWithPublicKey;
