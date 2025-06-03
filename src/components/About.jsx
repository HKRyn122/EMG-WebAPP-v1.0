import React from 'react';

function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#f8fafc] to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img src="/V3 1200-01.png" alt="Logo" className="h-16 mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Our Team</h1>
            <p className="text-xl text-gray-600">Advancing healthcare through innovative EMG solutions</p>
          </div>
          
          <div className="medical-card mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#00A79D]/10 flex items-center justify-center">
                <i className="fas fa-microscope text-xl text-[#00A79D]"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Our Mission</h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We are dedicated to advancing healthcare technology through innovative EMG monitoring
              solutions that help healthcare professionals and researchers better understand muscle
              activity and patient conditions.
            </p>
            
            <div className="bg-gradient-to-br from-[#00A79D]/5 to-transparent rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#00A79D] mb-4">Key Objectives</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#00A79D]/10 flex items-center justify-center mt-1">
                    <i className="fas fa-chart-line text-[#00A79D]"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Accurate Measurements</h4>
                    <p className="text-gray-600 text-sm mt-1">Precise EMG data collection and analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#2B3990]/10 flex items-center justify-center mt-1">
                    <i className="fas fa-mobile-alt text-[#2B3990]"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">User-Friendly Interface</h4>
                    <p className="text-gray-600 text-sm mt-1">Intuitive monitoring platform</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#00A79D]/10 flex items-center justify-center mt-1">
                    <i className="fas fa-flask text-[#00A79D]"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Research Support</h4>
                    <p className="text-gray-600 text-sm mt-1">Advanced analytics for studies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="medical-card text-center transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00A79D]/10 to-[#2B3990]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-[#00A79D]">IG</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Divyananda Japara</h3>
              <p className="text-[#00A79D] font-medium mb-2">Hardware Development</p>
              <p className="text-gray-600 text-sm">Electronics System Specialist</p>
            </div>
            
            <div className="medical-card text-center transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2B3990]/10 to-[#00A79D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-[#2B3990]">H</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Henry</h3>
              <p className="text-[#2B3990] font-medium mb-2">Software Development</p>
              <p className="text-gray-600 text-sm">Full-stack Developer</p>
            </div>
            
            <div className="medical-card text-center transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00A79D]/10 to-[#2B3990]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-[#00A79D]">M</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Mangnix</h3>
              <p className="text-[#00A79D] font-medium mb-2">Hardware Development</p>
              <p className="text-gray-600 text-sm">Electric System Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;