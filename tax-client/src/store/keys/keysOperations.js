import config from "../../config";

export const fetchPublicKey = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/public_key`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const { public_key } = await response.json();
      sessionStorage.setItem("public_key", public_key);
      return true;
    } else {
      // Handle error - could dispatch an error action if you want
      return false;
    }
  } catch (error) {
    // Handle fetch error
    console.error("Error fetching public key:", error);
    return false;
  }
};
