import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">🌸 My React App</div>
      <div>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Trang Chủ
        </NavLink>
        <NavLink to="/san-pham" className={({ isActive }) => (isActive ? "active" : "")}>
          Sản Phẩm
        </NavLink>
        <NavLink to="/lien-he" className={({ isActive }) => (isActive ? "active" : "")}>
          Liên Hệ
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
