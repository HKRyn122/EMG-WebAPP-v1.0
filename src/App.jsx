import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Monitor from './components/Monitor';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/monitor" 
          element={user ? <Monitor /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/about" 
          element={user ? <About /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!user ? <Register /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;