import { useState } from "react";
import { Card, Button, Row, Col, Badge, Modal, Toast, ToastContainer } from "react-bootstrap";
import "./MovieCard.css";

function MovieCard({ movies }) {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleAddToFavourites = (movie) => {
    const updated = [...favourites, movie];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
    setShowToast(true);
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div className="movie-container">
      <Row xs={1} sm={2} md={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card className="movie-card h-100">
              <Card.Img
                variant="top"
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  {movie.description.substring(0, 80)}...
                </Card.Text>
                <p>
                  <strong>Year:</strong> {movie.year} | <strong>Country:</strong> {movie.country}
                </p>
                <p>
                  <strong>Duration:</strong> {movie.duration} mins
                </p>
                <Badge bg="primary">{movie.genre}</Badge>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleAddToFavourites(movie)}
                >
                  ❤️ Add to Favourites
                </Button>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => handleShowDetails(movie)}
                >
                  ℹ️ Details
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast thông báo */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Favourites</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-100 rounded mb-3"
              />
              <p><strong>Genre:</strong> {selectedMovie.genre}</p>
              <p><strong>Duration:</strong> {selectedMovie.duration} mins</p>
              <p><strong>Showtimes:</strong> {selectedMovie.showtimes}</p>
              <p>{selectedMovie.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default MovieCard;
