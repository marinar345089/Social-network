import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});
let accessToken = localStorage.getItem("accessToken") || "";
export function setAccessToken(newToken) {
  if (newToken) {
    accessToken = newToken;
    localStorage.setItem("accessToken", newToken);
  }
}
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
