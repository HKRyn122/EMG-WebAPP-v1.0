import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/monitor" className="hover:text-blue-200">Monitor</Link>
          <Link to="/about" className="hover:text-blue-200">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;