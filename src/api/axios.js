import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// 🔄 Always attach latest credentials from localStorage
api.interceptors.request.use(config => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (email && password) {
    config.headers.Authorization = "Basic " + btoa(`${email}:${password}`);
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
