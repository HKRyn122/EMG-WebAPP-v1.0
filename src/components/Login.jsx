import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import LanguageToggle from './LanguageToggle';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.code === 'auth/invalid-credential'
          ? t('invalidCredentials', language)
          : t('loginError', language)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#f0f9ff] flex">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/V3 1200-01.png" alt="EMG Monitor Logo" className="h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('welcomeBack', language)}</h1>
            <p className="text-lg text-gray-600">{t('signInAccount', language)}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-exclamation-circle text-red-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('emailAddress', language)}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-[#00A79D]"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="pl-12 w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00A79D] focus:ring-4 focus:ring-[#00A79D]/10 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder={language === 'en' ? "Enter your email address" : "Masukkan alamat email Anda"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('password', language)}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-[#00A79D]"></i>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="pl-12 w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#00A79D] focus:ring-4 focus:ring-[#00A79D]/10 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder={language === 'en' ? "Enter your password" : "Masukkan kata sandi Anda"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-white text-lg font-semibold transition-all duration-200 transform ${
                  loading
                    ? 'bg-[#00A79D]/60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#00A79D] to-[#2B3990] hover:from-[#006B65] hover:to-[#1A236B] shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    {t('signingIn', language)}
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-3"></i>
                    {t('signIn', language)}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t('dontHaveAccount', language)}{' '}
                <Link to="/register" className="font-semibold text-[#00A79D] hover:text-[#006B65] transition-colors duration-200">
                  {t('createOneHere', language)}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-[#00A79D]/5 to-[#2B3990]/5 p-8">
        <div className="max-w-lg text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00A79D]/20 to-[#2B3990]/20 rounded-3xl transform rotate-6"></div>
            <img 
              src="/Screenshot_2025-05-28_230648-removebg-preview.png" 
              alt="EMG Monitoring Device" 
              className="relative w-full max-w-md mx-auto object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Advanced EMG Monitoring' : 'Monitoring EMG Canggih'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {language === 'en' 
              ? 'Experience precision muscle activity monitoring with our state-of-the-art S-EMG system. Real-time analysis and comprehensive insights for modern healthcare.'
              : 'Rasakan monitoring aktivitas otot presisi dengan sistem S-EMG canggih kami. Analisis real-time dan wawasan komprehensif untuk perawatan kesehatan modern.'
            }
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="flex items-center text-[#00A79D]">
              <i className="fas fa-check-circle mr-2"></i>
              <span className="text-sm font-medium">
                {language === 'en' ? 'Real-time Data' : 'Data Real-time'}
              </span>
            </div>
            <div className="flex items-center text-[#2B3990]">
              <i className="fas fa-check-circle mr-2"></i>
              <span className="text-sm font-medium">
                {language === 'en' ? 'Secure Platform' : 'Platform Aman'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;