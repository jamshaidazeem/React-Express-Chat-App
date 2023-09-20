import { useNavigate } from "react-router-dom";

const fetchWithGlobalErrorHandler = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        // Handle 401 Unauthorized here, e.g., redirect to login
        alert("Your session has expired, please login again, thanks");
        window.location.href = "/login";
      }

      // throw new Error(`HTTP Error! Status: ${response.status}`); // need to handle all other failed responses using api caller
    }

    return response;
  } catch (error) {
    // Handle other errors here e.g if 'throw' in try above is un-commented than error supplied to this catch for general error handling
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchWithGlobalErrorHandler;
