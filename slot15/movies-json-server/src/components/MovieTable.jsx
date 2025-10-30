import React from "react";
import { Table, Button, Image, Modal, Spinner, Alert, Badge } from "react-bootstrap";
import { useMovieState, useMovieDispatch } from "../contexts/MovieContext";

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, loading, movieToDelete, showDeleteModal } = state;

  const getBadgeVariant = (category) => {
    const colors = {
      "Hành động": "success",
      "Kinh dị": "dark",
      "Hài kịch": "warning",
      "Tình cảm": "danger",
      "Khoa học viễn tưởng": "primary",
    };
    return colors[category] || "secondary";
  };

  const handleEditClick = (movie) => dispatch({ type: "OPEN_EDIT_MODAL", payload: movie });
  const handleDeleteClick = (movie) => dispatch({ type: "OPEN_DELETE_MODAL", payload: movie });

  if (loading)
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
        <Alert variant="info" className="mt-3">
          Đang tải dữ liệu phim...
        </Alert>
      </div>
    );

  return (
    <>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>ID</th>
            <th>Tên Phim</th>
            <th>Danh mục</th>
            <th>Thời lượng</th>
            <th>Năm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Image
                  src={movie.avatar}
                  alt={movie.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  rounded
                />
              </td>
              <td>#{movie.id}</td>
              <td>{movie.name}</td>
              <td>
                <Badge bg={getBadgeVariant(movie.category)}>{movie.category}</Badge>
              </td>
              <td>{movie.duration} phút</td>
              <td>{movie.year}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">
                  Sửa
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim **{movieToDelete?.name}** (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
