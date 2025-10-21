import React, { useState } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

function LoginForm_Bai3() {
  // Quản lý state riêng lẻ cho từng input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập.';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted:', { username, password });
      setShowModal(true);
    }
  };
  
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ width: '25rem', margin: '20px auto' }}>
        <Card.Body>
          <Card.Title>Đăng nhập (State riêng lẻ)</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control 
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Đăng nhập thành công!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginForm_Bai3;