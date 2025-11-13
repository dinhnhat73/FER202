import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!usernameOrEmail) return 'Username or Email is required.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    const v = validate();
    if (v) { setErr(v); return; }
    try {
      const res = await api.get('/accounts');
      const accounts = res.data;
      const user = accounts.find(a =>
        (a.username === usernameOrEmail || a.email === usernameOrEmail) && a.password === password
      );
      if (!user) {
        setErr('Invalid username/email or password!');
        return;
      }
      if (user.role === 'admin' && user.status !== 'active') {
        setErr('Tài khoản bị khóa, bạn không có quyền truy cập.');
        return;
      }

      const authUser = {
        id: user.id,
        username: user.username,
        fullName: user.fullName || user.username,
        role: user.role,
        status: user.status,
        token: 'fake-jwt-token'
      };
      localStorage.setItem('authUser', JSON.stringify(authUser));

      setModalUser(authUser);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/home');
      }, 1200);
    } catch (err2) {
      setErr('Lỗi kết nối máy chủ');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form style={{ width: 420 }} onSubmit={handleSubmit}>
        <h3 className="mb-3">Login</h3>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>

      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Body>
          <h5>Welcome, {modalUser?.fullName || modalUser?.username}!</h5>
          <p>Login successful.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPage;
