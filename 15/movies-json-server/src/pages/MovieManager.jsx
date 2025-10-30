import React, { useState, useEffect } from "react";
import { MovieProvider } from "../contexts/MovieContext";
import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const MovieManager = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <MovieProvider>
      <div className="min-vh-100 py-5">
        <div
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Bật / Tắt Dark Mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </div>

        <div className="container">
          <h1 className="text-center mb-4">
            🎬 <span style={{ color: "var(--title-color)" }}>Quản lý Phim</span>{" "}
            <small className="text-muted">(Context + useReducer + Axios)</small>
          </h1>

          <div className="mb-4">
            <MovieForm />
          </div>

          <MovieTable />
        </div>
      </div>
    </MovieProvider>
  );
};

export default MovieManager;
