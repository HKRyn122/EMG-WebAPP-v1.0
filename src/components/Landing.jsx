import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import LanguageToggle from './LanguageToggle';

function Landing() {
  const { user } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <img src="/V3 1200-01.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link
                to={user ? "/dashboard" : "/login"}
                className="inline-flex items-center px-4 py-2 border border-[#00A79D] text-sm font-medium rounded-md text-[#00A79D] bg-white hover:bg-[#00A79D]/5 transition-colors duration-200"
              >
                {user ? t('goToDashboard', language) : t('signIn', language)}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">{t('advancedEMG', language)}</span>
                <span className="block text-[#00A79D] mt-2">{t('monitoringSystem', language)}</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed">
                {t('precisionMonitoring', language)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00A79D] hover:bg-[#00A79D]/90 transition-colors duration-200 shadow-md"
                >
                  {user ? t('goToDashboard', language) : t('getStarted', language)}
                </Link>
                <Link
                  to="/about"
                  className="flex justify-center items-center px-8 py-3 border border-[#2B3990] text-base font-medium rounded-md text-[#2B3990] bg-white hover:bg-[#2B3990]/5 transition-colors duration-200 shadow-md"
                >
                  {t('learnMore', language)}
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A79D]/10 to-transparent rounded-3xl transform -rotate-6"></div>
                <img 
                  src="/Screenshot_2025-05-28_230648-removebg-preview.png" 
                  alt="S-EMG Device" 
                  className="relative w-full max-w-md mx-auto object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-[#00A79D] tracking-wide uppercase">{t('features', language)}</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('completeEMGSolution', language)}
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {t('comprehensiveSolution', language)}
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-[#00A79D] text-white">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">{t('realTimeMonitoring', language)}</h3>
                <p className="mt-2 text-gray-500">
                  {t('realTimeDesc', language)}
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-[#2B3990] text-white">
                <i className="fas fa-mobile-alt text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">{t('mobileAccess', language)}</h3>
                <p className="mt-2 text-gray-500">
                  {t('mobileAccessDesc', language)}
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-[#00A79D] text-white">
                <i className="fas fa-database text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">{t('dataAnalysis', language)}</h3>
                <p className="mt-2 text-gray-500">
                  {t('dataAnalysisDesc', language)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2B3990]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">{language === 'en' ? 'Ready to get started?' : 'Siap untuk memulai?'}</span>
                <span className="block text-[#00A79D]">{language === 'en' ? 'Start monitoring today.' : 'Mulai monitoring hari ini.'}</span>
              </h2>
              <p className="mt-4 text-lg text-gray-100">
                {language === 'en' 
                  ? 'Join healthcare professionals using our EMG monitoring solution.'
                  : 'Bergabunglah dengan profesional kesehatan yang menggunakan solusi monitoring EMG kami.'
                }
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#2B3990] bg-white hover:bg-gray-50 transition-colors duration-200 shadow-md"
              >
                {user ? t('goToDashboard', language) : t('getStarted', language)}
              </Link>
              <Link
                to="/about"
                className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[#2B3990]/80 transition-colors duration-200 shadow-md"
              >
                {t('learnMore', language)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;