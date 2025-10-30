import React from "react";
import { Container } from "react-bootstrap";
import { MovieProvider } from "../contexts/MovieContext";
import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";

const MovieManagerContent = () => (
  <Container className="mt-5">
    <h1 className="text-center mb-4">🎬 Quản lý Phim (Axios + Context + useReducer)</h1>
    <MovieForm />
    <h2 className="mt-4">Danh sách phim</h2>
    <MovieTable />
  </Container>
);

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
