export function pemToArrayBuffer(pem) {
  // Remove the "BEGIN" and "END" comments
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.replace(pemHeader, "").replace(pemFooter, "");

  // Base64 decode the result
  const rawBase64 = pemContents.trim().replace(/\s+/g, "");
  const rawBinary = window.atob(rawBase64);

  // Convert raw binary to an ArrayBuffer
  const arrayBuffer = new ArrayBuffer(rawBinary.length);
  const asBytes = new Uint8Array(arrayBuffer);

  for (let i = 0; i < rawBinary.length; i++) {
    asBytes[i] = rawBinary.charCodeAt(i);
  }

  return arrayBuffer;
}

export function arrayBufferToBase64(buffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// export function base64ToArrayBuffer(base64) {
//   let binary_string = window.atob(base64);
//   let len = binary_string.length;
//   let bytes = new Uint8Array(len);
//   for (let i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes.buffer;
// }
