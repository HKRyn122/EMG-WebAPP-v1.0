import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Monitor from './components/Monitor';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import Settings from './components/settings/Settings';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import Analytics from './components/admin/Analytics';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoute from './components/auth/AdminRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<>
            <Navbar />
            <ProtectedRoute />
          </>}>
            <Route path="/" element={<Home />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<>
            <Navbar />
            <AdminRoute />
          </>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;