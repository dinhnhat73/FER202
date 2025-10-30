export const initialState = {
  movies: [],
  genres: [],
  loading: true,
  error: null,
  showDeleteModal: false,
  movieToDelete: null,
  showEditModal: false,
  movieToEdit: null,
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        movies: action.payload.movies,
        genres: action.payload.genres,
        loading: false,
      };

    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };

    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };

    case "OPEN_EDIT_MODAL":
      return { ...state, showEditModal: true, movieToEdit: action.payload };

    case "CLOSE_EDIT_MODAL":
      return { ...state, showEditModal: false, movieToEdit: null };

    case "OPEN_DELETE_MODAL":
      return { ...state, showDeleteModal: true, movieToDelete: action.payload };

    case "CLOSE_DELETE_MODAL":
      return { ...state, showDeleteModal: false, movieToDelete: null };

    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((m) => m.id !== action.payload),
        showDeleteModal: false,
        movieToDelete: null,
      };

    default:
      return state;
  }
};
