import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="medical-card mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-heartbeat text-2xl text-primary"></i>
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Welcome to Your Dashboard</h2>
                  <p className="text-gray-600">Monitor and analyze muscle activity in real-time</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="stats-card">
                <div className="text-primary mb-2">
                  <i className="fas fa-chart-line text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold mb-1">Real-time Data</h3>
                <p className="text-sm text-gray-600">Instant EMG signal tracking</p>
              </div>
              
              <div className="stats-card">
                <div className="text-secondary mb-2">
                  <i className="fas fa-calculator text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold mb-1">MSS Analysis</h3>
                <p className="text-sm text-gray-600">Muscle strength calculation</p>
              </div>
              
              <div className="stats-card">
                <div className="text-primary mb-2">
                  <i className="fas fa-database text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold mb-1">Data Insights</h3>
                <p className="text-sm text-gray-600">Comprehensive analytics</p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to start monitoring?</h2>
            <Link
              to="/monitor"
              className="btn-primary inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-play-circle"></i>
              <span>Start Monitoring</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;