import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/auth';
import { auth } from '../../firebase';
import LanguageToggle from '../LanguageToggle';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  // Truncate email if too long
  const truncateEmail = (email, maxLength = 25) => {
    if (!email) return '';
    return email.length > maxLength ? email.substring(0, maxLength) + '...' : email;
  };

  // Truncate username if too long
  const truncateUsername = (username, maxLength = 20) => {
    if (!username) return 'User';
    return username.length > maxLength ? username.substring(0, maxLength) + '...' : username;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none hover:opacity-80 transition-opacity duration-200"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00A79D] to-[#2B3990] flex items-center justify-center text-white font-semibold shadow-md">
          {auth.currentUser?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform transition-all duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00A79D] to-[#2B3990] flex items-center justify-center text-white font-semibold flex-shrink-0">
                {auth.currentUser?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {truncateUsername(auth.currentUser?.displayName)}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {truncateEmail(auth.currentUser?.email)}
                </p>
              </div>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Language</span>
              <LanguageToggle />
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleSettingsClick}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <i className="fas fa-cog mr-3 text-gray-400 w-4"></i>
              Settings
            </button>
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <i className="fas fa-sign-out-alt mr-3 text-gray-400 w-4"></i>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;