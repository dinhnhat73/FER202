import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import movieApi from "../api/movieAPI";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await movieApi.get(`/accounts?username=${username}&password=${password}`);
      if (response.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        navigate("/movies");
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (error) {
      setError("Lỗi kết nối đến server!");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">🎬 Đăng nhập hệ thống</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
