// src/components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

// Hàm validation
const validate = (name, value, formData) => {
  switch (name) {
    case 'username':
      if (value.length < 3) return 'Tên người dùng phải có ít nhất 3 ký tự.';
      if (!/^[a-zA-Z0-9_.]+$/.test(value)) return 'Chỉ chấp nhận chữ, số, _, .';
      if (/\s/.test(value)) return 'Không được chứa khoảng trắng.';
      return '';
    case 'email':
      if (!/\S+@\S+\.\S+/.test(value)) return 'Email không hợp lệ.';
      return '';
    case 'password':
      if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.';
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
        return 'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt.';
      }
      return '';
    case 'confirmPassword':
      if (value !== formData.password) return 'Mật khẩu xác nhận không khớp.';
      return '';
    default:
      return '';
  }
};

function RegisterForm() {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkFormValidity = () => {
        const noErrors = Object.values(errors).every(err => err === '');
        const allFieldsFilled = Object.values(formData).every(field => field !== '');
        return noErrors && allFieldsFilled;
    };
    setIsFormValid(checkFormValidity());
  }, [errors, formData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validate(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
        setShowModal(true);
        console.log('Đăng ký thành công:', formData);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };
  
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ width: '30rem', margin: '20px auto' }}>
        <Card.Body>
          <Card.Title>Đăng ký tài khoản</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control 
                type="text" name="username" value={formData.username}
                onChange={handleChange} isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" name="email" value={formData.email}
                onChange={handleChange} isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control 
                type="password" name="password" value={formData.password}
                onChange={handleChange} isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control 
                type="password" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleChange} isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" onClick={handleReset} className="me-2">Hủy</Button>
              <Button variant="primary" type="submit" disabled={!isFormValid}>Đăng ký</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tài khoản của bạn đã được đăng ký thành công.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Tuyệt vời!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterForm;