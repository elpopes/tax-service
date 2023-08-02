import jwtDecode from "jwt-decode";

export function isTokenValid(token) {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check if the token has expired
    return decodedToken.exp * 1000 > Date.now();
  } catch (e) {
    console.log("Failed to decode JWT:", e);
    return false;
  }
}
