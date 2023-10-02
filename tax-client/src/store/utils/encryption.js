import { pemToArrayBuffer } from "./pemConversion";

async function encryptWithPublicKey(text, publicKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Use the pemToArrayBuffer function for PEM to ArrayBuffer conversion
  const publicKeyArrayBuffer = pemToArrayBuffer(publicKey);

  const importedKey = await window.crypto.subtle.importKey(
    "spki",
    publicKeyArrayBuffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"]
  );

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    importedKey,
    data
  );

  return ab2str(encrypted); // ArrayBuffer to string
}

// ArrayBuffer to string
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// String to ArrayBuffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export default encryptWithPublicKey;
