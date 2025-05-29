import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Mobile-optimized Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">EMG Monitor</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#" // Replace with actual APK link when available
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 shadow-sm"
              >
                <i className="fas fa-download mr-2"></i>
                <span className="hidden sm:inline">Download</span> APK
              </a>
              <Link
                to={user ? "/dashboard" : "/login"}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                {user ? "Dashboard" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Simpler EMG</span>
                <span className="block text-blue-600 mt-2">Monitoring System</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed">
                Experience precision muscle activity monitoring with our state-of-the-art S-EMG Capstone system. 
                Real-time analysis and comprehensive insights for modern healthcare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  {user ? "Go to Dashboard" : "Get Started"}
                </Link>
                <Link
                  to="/about"
                  className="flex justify-center items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-md"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent rounded-3xl transform -rotate-6"></div>
                <img 
                  src="/Screenshot_2025-05-28_230648-removebg-preview.png" 
                  alt="S-EMG Capstone Device" 
                  className="relative w-full max-w-md mx-auto object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Mobile Optimized */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Complete EMG Monitoring Solution
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our comprehensive solution provides all the tools needed for accurate muscle activity assessment
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">Real-time Monitoring</h3>
                <p className="mt-2 text-gray-500">
                  Monitor muscle activity in real-time with high precision sensors
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white">
                <i className="fas fa-mobile-alt text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">Mobile Access</h3>
                <p className="mt-2 text-gray-500">
                  Access your data anywhere with our mobile application
                </p>
              </div>
            </div>

            <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 left-6 h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white">
                <i className="fas fa-database text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-bold text-gray-900">Data Analysis</h3>
                <p className="mt-2 text-gray-500">
                  Comprehensive data visualization and analysis tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Mobile Optimized */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="block text-blue-200">Start monitoring today.</span>
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join healthcare professionals using our EMG monitoring solution.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 shadow-md"
              >
                {user ? "Go to Dashboard" : "Get Started"}
              </Link>
              <Link
                to="/about"
                className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 shadow-md"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;