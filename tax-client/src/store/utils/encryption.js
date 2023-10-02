async function encryptSSN(ssn, publicKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ssn);

  const importedKey = await window.crypto.subtle.importKey(
    "spki",
    str2ab(atob(publicKey.split("\n").slice(1, -1).join(""))), // Convert base64 public key to ArrayBuffer
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

  return ab2str(encrypted); // Or whatever format you'd like
}

// ArrayBuffer to string
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// String to ArrayBuffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
