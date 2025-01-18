import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to S-EMG Monitoring System
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Advanced muscle activity measurement and analysis using state-of-the-art EMG technology
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card-gradient p-6 rounded-xl shadow-lg">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">Instant EMG signal tracking and analysis</p>
            </div>
            
            <div className="card-gradient p-6 rounded-xl shadow-lg">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-calculator"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Muscle Strength Scale Analysis</h3>
              <p className="text-gray-600">Automatic muscle strength calculation</p>
            </div>
            
            <div className="card-gradient p-6 rounded-xl shadow-lg">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-database"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
              <p className="text-gray-600">Comprehensive data charts and analysis</p>
            </div>
          </div>
          
          <Link
            to="/monitor"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10"
          >
            Start Monitoring
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;