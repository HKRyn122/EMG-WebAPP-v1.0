import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import AnalyticsCard from './analytics/AnalyticsCard';
import SKODistributionChart from './analytics/SKODistributionChart';
import UserActivityList from './analytics/UserActivityList';

function Analytics() {
  const { analytics, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">System Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnalyticsCard
            title="Total Users"
            value={analytics.totalUsers}
            icon="users"
            className="text-blue-600"
          />
          <AnalyticsCard
            title="Total Readings"
            value={analytics.totalReadings}
            icon="chart-line"
            className="text-green-600"
          />
          <AnalyticsCard
            title="Average SKO"
            value={analytics.averageSKO?.toFixed(2) || 'N/A'}
            icon="star"
            className="text-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-gradient p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">SKO Distribution</h2>
            <SKODistributionChart distribution={analytics.skoDistribution} />
          </div>
          <UserActivityList userActivity={analytics.userActivity} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;