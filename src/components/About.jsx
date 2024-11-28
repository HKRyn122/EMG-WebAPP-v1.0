import React from 'react';

function About() {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Our Team</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">
            We are dedicated to advancing healthcare technology through innovative EMG monitoring
            solutions that help healthcare professionals and researchers better understand muscle
            activity and patient conditions.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold">Ian Games</h3>
              <p className="text-gray-600">Role: Project Lead</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold">Henry</h3>
              <p className="text-gray-600">Role: Developer</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold">Mangnix</h3>
              <p className="text-gray-600">Role: Data Scientist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;