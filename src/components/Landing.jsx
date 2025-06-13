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
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white overflow-hidden">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center animate-fade-in">
              <img src="/V3 1200-01.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-3 animate-fade-in-delay">
              <LanguageToggle />
              <Link
                to={user ? "/dashboard" : "/login"}
                className="inline-flex items-center px-4 py-2 border border-[#00A79D] text-sm font-medium rounded-md text-[#00A79D] bg-white hover:bg-[#00A79D]/5 transition-all duration-300 hover:scale-105"
              >
                {user ? t('goToDashboard', language) : t('signIn', language)}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-[#00A79D]/10 rounded-full"></div>
          <div className="floating-element-delay absolute top-40 right-20 w-16 h-16 bg-[#2B3990]/10 rounded-full"></div>
          <div className="floating-element absolute bottom-40 left-20 w-12 h-12 bg-[#00A79D]/15 rounded-full"></div>
          <div className="floating-element-delay absolute bottom-20 right-40 w-24 h-24 bg-[#2B3990]/10 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight animate-slide-up">
                <span className="block">{t('advancedEMG', language)}</span>
                <span className="block text-[#00A79D] mt-2 animate-slide-up-delay">{t('monitoringSystem', language)}</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed animate-fade-in-up">
                {t('precisionMonitoring', language)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up-delay">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00A79D] hover:bg-[#00A79D]/90 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
                >
                  {user ? t('goToDashboard', language) : t('getStarted', language)}
                </Link>
                <Link
                  to="/about"
                  className="flex justify-center items-center px-8 py-3 border border-[#2B3990] text-base font-medium rounded-md text-[#2B3990] bg-white hover:bg-[#2B3990]/5 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
                >
                  {t('learnMore', language)}
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A79D]/10 to-transparent rounded-3xl transform -rotate-6 animate-pulse-slow"></div>
                <img 
                  src="/Screenshot_2025-05-28_230648-removebg-preview.png" 
                  alt="S-EMG Device" 
                  className="relative w-full max-w-md mx-auto object-contain transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-4 transform rotate-12 scale-150">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#00A79D] rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-base font-semibold text-[#00A79D] tracking-wide uppercase">{t('features', language)}</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('completeEMGSolution', language)}
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {t('comprehensiveSolution', language)}
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up group">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-[#00A79D] text-white group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">{t('realTimeMonitoring', language)}</h3>
                <p className="mt-2 text-gray-500">
                  {t('realTimeDesc', language)}
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up-delay group">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-[#2B3990] text-white group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-mobile-alt text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">{t('mobileAccess', language)}</h3>
                <p className="mt-2 text-gray-500">
                  {t('mobileAccessDesc', language)}
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up-delay-2 group">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-[#00A79D] text-white group-hover:scale-110 transition-transform duration-300">
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

      <div className="bg-[#2B3990] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990] via-[#1A236B] to-[#2B3990] animate-gradient-x"></div>
        
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-center lg:text-left animate-slide-in-left">
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
            <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-end animate-slide-in-right">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#2B3990] bg-white hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
              >
                {user ? t('goToDashboard', language) : t('getStarted', language)}
              </Link>
              <Link
                to="/about"
                className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[#2B3990]/80 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
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