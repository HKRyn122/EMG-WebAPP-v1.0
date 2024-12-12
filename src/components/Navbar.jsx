import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProfileMenu from './profile/ProfileMenu';
import { isAdmin } from '../utils/roles';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">EMG System</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition-colors duration-200">
            Home
          </Link>
          <Link to="/monitor" className="hover:text-blue-200 transition-colors duration-200">
            Monitor
          </Link>
          <Link to="/about" className="hover:text-blue-200 transition-colors duration-200">
            About
          </Link>
          {isAdmin(user) && (
            <Link to="/admin" className="hover:text-blue-200 transition-colors duration-200">
              Admin
            </Link>
          )}
        </div>
        
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default Navbar;