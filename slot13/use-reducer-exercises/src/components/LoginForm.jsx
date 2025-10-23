import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function LoginForm() {
  const { user, error, login, logout } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const cardStyle = {
    width: "350px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    background: theme === "light" ? "#fff" : "#2a2a2a",
    color: theme === "light" ? "#212529" : "#f8f9fa",
    transition: "0.3s ease",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <h3>🔐 Đăng Nhập</h3>

        {user ? (
          <>
            <p className="mt-3">
              Xin chào, <b>{user.username}</b> ({user.role})
            </p>
            <Button variant="danger" onClick={logout}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Nhập username..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Nhập password..."
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Đăng nhập
            </Button>

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
