import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) {
      navigate("/manager");
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">
          🎬 Đăng nhập hệ thống
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Nhập username..."
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
