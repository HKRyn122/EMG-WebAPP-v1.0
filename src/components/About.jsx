import React from 'react';

function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-sky-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About Our Team</h1>
          
          <div className="card-gradient rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We are dedicated to advancing healthcare technology through innovative EMG monitoring
              solutions that help healthcare professionals and researchers better understand muscle
              activity and patient conditions.
            </p>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Key Objectives</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Provide accurate and reliable EMG measurements
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Develop user-friendly monitoring interfaces
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Support medical research and diagnosis
                </li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-gradient p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">IG</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Divyananda Japara</h3>
              <p className="text-blue-600 font-medium">Anggota 1</p>
              <p className="text-gray-600 mt-2">Hardware & Electronics System Development</p>
            </div>
            
            <div className="card-gradient p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">H</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Henry</h3>
              <p className="text-blue-600 font-medium">Anggota 2</p>
              <p className="text-gray-600 mt-2">Software Development</p>
            </div>
            
            <div className="card-gradient p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">M</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Mangnix</h3>
              <p className="text-blue-600 font-medium">Anggota 3</p>
              <p className="text-gray-600 mt-2">Hardware & Electric System Development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;