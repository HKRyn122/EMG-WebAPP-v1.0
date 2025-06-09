import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../../firebase';
import { ref, set } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../../utils/roles';
import { useLanguage } from '../../contexts/LanguageContext';
import { t } from '../../utils/translations';
import LanguageToggle from '../LanguageToggle';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.USER
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { username, email, password, confirmPassword, role } = formData;

    if (!username.trim()) {
      setError(t('usernameRequired', language));
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(t('passwordMismatch', language));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('passwordTooShort', language));
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: username
      });
      
      await set(ref(database, `users/${user.uid}`), {
        username,
        email: user.email,
        role: role,
        createdAt: Date.now()
      });

      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError(t('emailInUse', language));
          break;
        case 'auth/invalid-email':
          setError(t('invalidEmail', language));
          break;
        case 'auth/operation-not-allowed':
          setError(t('registrationDisabled', language));
          break;
        case 'auth/weak-password':
          setError(t('weakPassword', language));
          break;
        default:
          setError(t('registrationFailed', language));
      }
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

      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-[#2B3990]/5 to-[#00A79D]/5 p-8">
        <div className="max-w-lg text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/20 to-[#00A79D]/20 rounded-3xl transform -rotate-6"></div>
            <img 
              src="/Screenshot_2025-05-28_230648-removebg-preview.png" 
              alt="EMG Monitoring Device" 
              className="relative w-full max-w-md mx-auto object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Join Our Platform' : 'Bergabung dengan Platform Kami'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {language === 'en' 
              ? 'Start your journey with professional EMG monitoring. Access real-time data, comprehensive analytics, and advanced muscle strength assessment tools.'
              : 'Mulai perjalanan Anda dengan monitoring EMG profesional. Akses data real-time, analitik komprehensif, dan alat penilaian kekuatan otot canggih.'
            }
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="flex items-center text-[#2B3990]">
              <i className="fas fa-chart-line mr-2"></i>
              <span className="text-sm font-medium">
                {language === 'en' ? 'Advanced Analytics' : 'Analitik Canggih'}
              </span>
            </div>
            <div className="flex items-center text-[#00A79D]">
              <i className="fas fa-shield-alt mr-2"></i>
              <span className="text-sm font-medium">
                {language === 'en' ? 'Secure Data' : 'Data Aman'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/V3 1200-01.png" alt="EMG Monitor Logo" className="h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('createAccount', language)}</h1>
            <p className="text-lg text-gray-600">{t('joinPlatform', language)}</p>
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('username', language)}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-user text-[#2B3990]"></i>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-12 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2B3990] focus:ring-4 focus:ring-[#2B3990]/10 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder={language === 'en' ? "Choose a username" : "Pilih nama pengguna"}
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

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
                    name="email"
                    type="email"
                    required
                    className="pl-12 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00A79D] focus:ring-4 focus:ring-[#00A79D]/10 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder={language === 'en' ? "Enter your email address" : "Masukkan alamat email Anda"}
                    value={formData.email}
                    onChange={handleChange}
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
                    <i className="fas fa-lock text-[#2B3990]"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-12 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2B3990] focus:ring-4 focus:ring-[#2B3990]/10 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder={language === 'en' ? "Create a secure password" : "Buat kata sandi yang aman"}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('confirmPassword', language)}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-[#00A79D]"></i>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="pl-12 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#00A79D] focus:ring-4 focus:ring-[#00A79D]/10 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder={language === 'en' ? "Confirm your password" : "Konfirmasi kata sandi Anda"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-white text-lg font-semibold transition-all duration-200 transform ${
                  loading
                    ? 'bg-[#2B3990]/60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2B3990] to-[#00A79D] hover:from-[#1A236B] hover:to-[#006B65] shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    {t('creatingAccount', language)}
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-3"></i>
                    {t('createAccount', language)}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t('alreadyHaveAccount', language)}{' '}
                <Link to="/login" className="font-semibold text-[#2B3990] hover:text-[#1A236B] transition-colors duration-200">
                  {t('signInHere', language)}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;