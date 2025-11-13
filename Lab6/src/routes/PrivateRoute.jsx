import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const authJson = localStorage.getItem('authUser');
  if (!authJson) return <Navigate to="/login" replace />;

  const user = JSON.parse(authJson);
  if (requireAdmin && !(user.role === 'admin' && user.status === 'active')) {
    return <Navigate to="/login" replace state={{ message: 'Tài khoản không có quyền truy cập' }} />;
  }
  return children;
};

export default PrivateRoute;
