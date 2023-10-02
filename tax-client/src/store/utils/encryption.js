import { pemToArrayBuffer, arrayBufferToBase64 } from "./dataConversion";

async function encryptWithPublicKey(text, publicKey) {
  // Step 1: Encrypt data with AES-GCM
  const aesKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // For AES-GCM, IV should be 12 bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    aesKey,
    data
  );

  // Step 2: Encrypt AES key with RSA public key
  const publicKeyArrayBuffer = pemToArrayBuffer(publicKey);
  const importedPublicKey = await window.crypto.subtle.importKey(
    "spki",
    publicKeyArrayBuffer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  const exportedAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
  const encryptedAesKey = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    importedPublicKey,
    exportedAesKey
  );

  // Step 3: Return encrypted data and encrypted AES key
  return {
    encryptedData: arrayBufferToBase64(encryptedData),
    encryptedAesKey: arrayBufferToBase64(encryptedAesKey),
    iv: arrayBufferToBase64(iv),
  };
}

export default encryptWithPublicKey;
