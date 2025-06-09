import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      title={language === 'en' ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
    >
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-700">
          {language === 'en' ? '🇺🇸' : '🇮🇩'}
        </span>
        <span className="text-sm font-medium text-gray-700 uppercase">
          {language}
        </span>
      </div>
      <i className="fas fa-exchange-alt text-xs text-gray-500"></i>
    </button>
  );
}

export default LanguageToggle;