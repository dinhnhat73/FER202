import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import PaymentList from './pages/PaymentList';
import Header from './components/Header';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/payments" element={
            <PrivateRoute>
              <PaymentList />
            </PrivateRoute>
          } />
          <Route path="/users" element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
