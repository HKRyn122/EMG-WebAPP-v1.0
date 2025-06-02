import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProfileMenu from './profile/ProfileMenu';
import { isAdmin } from '../utils/roles';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/V3 1200-01.png" alt="Logo" className="h-10 w-auto" />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-[#1ABC9C] transition-colors duration-200">
              Home
            </Link>
            <Link to="/monitor" className="text-gray-600 hover:text-[#1ABC9C] transition-colors duration-200">
              Monitor
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#1ABC9C] transition-colors duration-200">
              About
            </Link>
            {isAdmin(user) && (
              <Link to="/admin" className="text-gray-600 hover:text-[#1ABC9C] transition-colors duration-200">
                Admin
              </Link>
            )}
          </div>
          
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;