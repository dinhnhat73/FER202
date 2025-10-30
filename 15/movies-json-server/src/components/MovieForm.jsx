import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useMovieState, useMovieDispatch } from "../contexts/MovieContext";

const MovieForm = () => {
  const { genres, movieToEdit, showEditModal } = useMovieState();
  const { createMovie, editMovie, dispatch } = useMovieDispatch();

  const [movie, setMovie] = useState({
    title: "",
    year: "",
    duration: "",
    genreId: "",
    avatar: "",
  });

  // Khi bấm nút “Sửa”, form sẽ tự đổ dữ liệu phim lên
  useEffect(() => {
    if (showEditModal && movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [movieToEdit, showEditModal]);

  // Hàm xử lý nhập form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  // Hàm thêm hoặc cập nhật phim
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie.title || !movie.year || !movie.genreId) {
      alert("Vui lòng nhập đầy đủ thông tin phim!");
      return;
    }

    if (showEditModal) {
      editMovie(movie);
      dispatch({ type: "CLOSE_EDIT_MODAL" });
    } else {
      const newMovie = { ...movie, id: Date.now() };
      createMovie(newMovie);
    }

    // Reset form
    setMovie({
      title: "",
      year: "",
      duration: "",
      genreId: "",
      avatar: "",
    });
  };

  return (
    <Card className="p-4 shadow-sm">
      <h4 className="text-center text-success mb-3">
        {showEditModal ? "✏️ Chỉnh sửa phim" : "➕ Thêm phim mới"}
      </h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Tên phim</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChange}
                placeholder="Nhập tên phim..."
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="year">
              <Form.Label>Năm</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={movie.year}
                onChange={handleChange}
                placeholder="VD: 2024"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="duration">
              <Form.Label>Thời lượng (phút)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={movie.duration}
                onChange={handleChange}
                placeholder="VD: 120"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="genreId">
              <Form.Label>Thể loại</Form.Label>
              <Form.Select
                name="genreId"
                value={movie.genreId}
                onChange={handleChange}
              >
                <option value="">-- Chọn thể loại --</option>
                {Array.isArray(genres) &&
                  genres.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="avatar">
              <Form.Label>Ảnh (URL)</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={movie.avatar}
                onChange={handleChange}
                placeholder="Dán link ảnh..."
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit" className="px-4">
            {showEditModal ? "Lưu thay đổi" : "Thêm phim"}
          </Button>
          {showEditModal && (
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
            >
              Hủy
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default MovieForm;
                    
