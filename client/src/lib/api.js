import axios from "axios";

// --- Axios Instances ---

// Authenticated requests (with credentials & token)
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});


// --- Request Interceptor (Add Token) ---
api.interceptors.request.use(
  (config) => {
    try {
      const storedState = JSON.parse(localStorage.getItem("contest-tracker-storage") || "{}");
      const token = storedState.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Error reading token from localStorage:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor (Handle Errors) ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401: // Unauthorized
          localStorage.removeItem("contest-tracker-storage");
          window.location.href = "/login";
          break;

        case 403:
          console.error("Access forbidden:", data?.message);
          break;

        case 404:
          console.error("Not found:", data?.message);
          break;

        case 500:
          console.error("Server error:", data?.message);
          break;

        default:
          console.error("Unexpected error:", data?.message);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

// --- Exports ---
export default api;
