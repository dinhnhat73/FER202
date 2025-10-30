// src/api/movieAPI.js
import axios from "axios";

const movieApi = axios.create({
  baseURL: "http://localhost:3001", // Địa chỉ của json-server
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 Kiểm tra kết nối server
movieApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Lỗi khi kết nối đến server:", error.message);
    alert("⚠️ Lỗi kết nối đến server! Vui lòng kiểm tra json-server!");
    return Promise.reject(error);
  }
);

export default movieApi;
