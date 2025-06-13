import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProfileMenu from './profile/ProfileMenu';
import { isAdmin } from '../utils/roles';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';

function Navbar() {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="navbar-container">
          {/* Logo - Links to Landing Page */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <img src="/V3 1200-01.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>
          
          {/* Perfectly Centered Navigation Links */}
          <div className="navbar-center">
            <Link 
              to="/monitor" 
              className="nav-link text-gray-600 hover:text-[#00A79D] transition-all duration-200 font-medium"
            >
              <i className="fas fa-wave-square mr-2"></i>
              {t('monitor', language)}
            </Link>
            <Link 
              to="/about" 
              className="nav-link text-gray-600 hover:text-[#00A79D] transition-all duration-200 font-medium"
            >
              <i className="fas fa-info-circle mr-2"></i>
              {t('about', language)}
            </Link>
            {isAdmin(user) && (
              <Link 
                to="/admin" 
                className="nav-link text-gray-600 hover:text-[#2B3990] transition-all duration-200 font-medium"
              >
                <i className="fas fa-user-shield mr-2"></i>
                {t('admin', language)}
              </Link>
            )}
          </div>
          
          {/* Right Side - Profile Menu (Symmetrical with Logo) */}
          <div className="flex justify-end">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;