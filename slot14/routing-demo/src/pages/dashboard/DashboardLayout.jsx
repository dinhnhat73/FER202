import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h3>🧭 Dashboard</h3>
        <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
          Trang chủ
        </NavLink>
        <NavLink to="/dashboard/settings" className={({ isActive }) => (isActive ? "active" : "")}>
          Cài đặt
        </NavLink>
        <NavLink to="/dashboard/reports" className={({ isActive }) => (isActive ? "active" : "")}>
          Báo cáo
        </NavLink>
      </nav>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
