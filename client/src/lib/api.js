import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const loginapi = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const storedState = JSON.parse(
      localStorage.getItem("contest-tracker-storage") || "{}"
    );
    const token = storedState.state?.token;

    // Add token to headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration and other errors
api.interceptors.response.use(
  (response) => {
    // Return the response if everything is fine
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized (token expired or invalid)
          localStorage.removeItem("contest-tracker-storage");
          window.location.href = "/login";
          break;

        case 403: // Forbidden (user doesn't have access)
          console.error("Access forbidden:", error.response.data.message);
          break;

        case 404: // Not Found
          console.error("Resource not found:", error.response.data.message);
          break;

        case 500: // Internal Server Error
          console.error("Server error:", error.response.data.message);
          break;

        default:
          console.error("An error occurred:", error.response.data.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
    }

    // Reject the error to propagate it to the calling function
    return Promise.reject(error);
  }
);

export default api;
