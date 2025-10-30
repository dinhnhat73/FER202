import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MovieManager from "./pages/MovieManager";

function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/movies" : "/login"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/movies"
          element={user ? <MovieManager /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
