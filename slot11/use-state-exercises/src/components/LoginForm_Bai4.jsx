import React, { useState } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

function LoginForm_Bai4() {
  // Quản lý state bằng một object duy nhất
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  // Một hàm xử lý cho tất cả các input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập.';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted:', formData);
      setShowModal(true);
    }
  };
  
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ width: '25rem', margin: '20px auto' }}>
        <Card.Body>
          <Card.Title>Đăng nhập (State Object)</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control 
                type="text"
                name="username" // Thuộc tính name rất quan trọng ở đây
                value={formData.username}
                onChange={handleChange}
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
                name="password" // Thuộc tính name rất quan trọng ở đây
                value={formData.password}
                onChange={handleChange}
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

export default LoginForm_Bai4;