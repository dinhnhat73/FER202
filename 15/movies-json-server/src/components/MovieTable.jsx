import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();

  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;

  // ✅ Tạo genreMap an toàn (tránh lỗi undefined)
  const genreMap = Array.isArray(genres)
    ? genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {})
    : {};

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && (!Array.isArray(movies) || movies.length === 0) ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Thể Loại</th>
              <th>Thời Lượng (phút)</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {/* ✅ Sửa lỗi ở đây: chỉ map nếu movies là mảng */}
            {Array.isArray(movies) && movies.length > 0 ? (
              movies.map((movie) => {
                const genreName = genreMap[movie.genreId] || 'Unknown';
                return (
                  <tr key={movie.id}>
                    <td>
                      {movie.avatar ? (
                        <Image
                          src={movie.avatar}
                          alt={movie.title}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          rounded
                        />
                      ) : (
                        <span>Không có ảnh</span>
                      )}
                    </td>
                    <td>#{movie.id}</td>
                    <td>
                      <strong>{movie.title}</strong>
                      <br />
                      <small className="text-muted">({movie.year})</small>
                    </td>
                    <td>{genreName}</td>
                    <td>{movie.duration} phút</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditClick(movie)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(movie)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Không có phim nào để hiển thị
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim <b>{movieToDelete?.title}</b> (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
