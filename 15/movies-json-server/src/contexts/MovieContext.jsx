import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  getMovies,
  getGenres,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../api/movieAPI";
import { movieReducer, initialState } from "../reducers/movieReducers";

const MovieStateContext = createContext();
const MovieDispatchContext = createContext();

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Load dữ liệu từ JSON server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movies, genres] = await Promise.all([getMovies(), getGenres()]);
        dispatch({ type: "FETCH_SUCCESS", payload: { movies, genres } });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };
    fetchData();
  }, []);

  // Xử lý CRUD
  const createMovie = async (movie) => {
    try {
      const newMovie = await addMovie(movie);
      dispatch({ type: "ADD_MOVIE", payload: newMovie });
    } catch (err) {
      console.error("Add movie error:", err);
    }
  };

  const editMovie = async (movie) => {
    try {
      const updated = await updateMovie(movie);
      dispatch({ type: "UPDATE_MOVIE", payload: updated });
    } catch (err) {
      console.error("Update movie error:", err);
    }
  };

  const confirmDelete = async (id) => {
    try {
      await deleteMovie(id);
      dispatch({ type: "DELETE_MOVIE", payload: id });
    } catch (err) {
      console.error("Delete movie error:", err);
    }
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider
        value={{ dispatch, createMovie, editMovie, confirmDelete }}
      >
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

// Custom hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);
