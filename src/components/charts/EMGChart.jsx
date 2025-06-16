import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EMGChart = ({ data, timestamps }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Real-time EMG Signal (Last 12 Readings)',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 167, 157, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#00A79D',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `EMG: ${context.parsed.y.toFixed(2)} mV`;
          },
          title: function(context) {
            const timestamp = timestamps[context[0].dataIndex];
            return new Date(timestamp).toLocaleTimeString();
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'EMG Value (mV)',
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#374151'
        },
        grid: {
          color: 'rgba(0, 167, 157, 0.1)',
          lineWidth: 1
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6B7280',
          callback: function(value) {
            return value.toFixed(1) + ' mV';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Sequence',
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#374151'
        },
        grid: {
          color: 'rgba(43, 57, 144, 0.1)',
          lineWidth: 1
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6B7280',
          maxTicksLimit: 12,
          callback: function(value, index) {
            // Show only every other tick for better readability
            return index % 2 === 0 ? `T${index + 1}` : '';
          }
        }
      }
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: '#00A79D',
        borderColor: '#ffffff'
      },
      line: {
        tension: 0.4,
        borderWidth: 3
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  const chartData = {
    labels: data.map((_, index) => `Reading ${index + 1}`),
    datasets: [
      {
        label: 'EMG Signal',
        data: data,
        borderColor: '#00A79D',
        backgroundColor: 'rgba(0, 167, 157, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00A79D',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#2B3990',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2
      }
    ]
  };

  return (
    <div style={{ height: '350px' }} className="relative">
      <Line options={chartOptions} data={chartData} />
      {data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <i className="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 font-medium">Waiting for EMG data...</p>
            <p className="text-gray-400 text-sm">Start monitoring to see real-time signals</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMGChart;