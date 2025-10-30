import axios from "axios";

const API_URL = "http://localhost:3001";

// Lấy danh sách phim
export const getMovies = async () => {
  const response = await axios.get(`${API_URL}/movies`);
  return response.data;
};

// Lấy danh sách thể loại
export const getGenres = async () => {
  const response = await axios.get(`${API_URL}/genres`);
  return response.data;
};

// Thêm phim mới
export const addMovie = async (movie) => {
  const response = await axios.post(`${API_URL}/movies`, movie);
  return response.data;
};

// Cập nhật phim
export const updateMovie = async (movie) => {
  const response = await axios.put(`${API_URL}/movies/${movie.id}`, movie);
  return response.data;
};

// Xóa phim
export const deleteMovie = async (id) => {
  await axios.delete(`${API_URL}/movies/${id}`);
};
