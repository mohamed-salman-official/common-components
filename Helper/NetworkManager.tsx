import { BASE_URL, CONTENT_TYPE, TIMEOUT } from "@/Utils/Constant";
import axios from "axios";

// Base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": CONTENT_TYPE,
  },
});



// Request interceptor with full logging
api.interceptors.request.use(
  (config) => {
    console.log("=== [API REQUEST] ===");
    console.log("➡️ URL:", `${config.baseURL}${config.url}`);
    console.log("➡️ Method:", config.method?.toUpperCase());
    console.log("➡️ Headers:", config.headers);
    console.log("➡️ Params:", config.params);
    console.log("➡️ Data:", config.data);
    console.log("=====================");
    return config;
  },
  (error) => {
    console.error("❌ [REQUEST ERROR]:", error);
    return Promise.reject(error);
  }
);

// Response interceptor (optional, but recommended)
api.interceptors.response.use(
  (response) => {
    console.log("✅ [RESPONSE SUCCESS]");
    console.log("⬅️ URL:", `${response.config.baseURL}${response.config.url}`);
    console.log("⬅️ Status:", response.status);
    console.log("⬅️ Data:", response.data);
    console.log("=====================");
    return response;
  },
  (error) => {
    console.error(
      "❌ [RESPONSE ERROR]:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
