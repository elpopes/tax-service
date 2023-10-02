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
