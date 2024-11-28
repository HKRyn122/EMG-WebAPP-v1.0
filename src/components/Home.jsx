import React from 'react';

function Home() {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to EMG Monitoring System</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">About EMG Monitoring</h2>
          <p className="mb-4">
            Our EMG (Electromyography) monitoring system provides real-time muscle activity measurement
            and analysis using advanced sensors and data processing techniques.
          </p>
          <h3 className="text-xl font-bold mb-2">Features:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Real-time EMG signal monitoring</li>
            <li>Automatic Muscle Mass Scale (SKO) calculation</li>
            <li>Historical data visualization</li>
            <li>Secure user authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;