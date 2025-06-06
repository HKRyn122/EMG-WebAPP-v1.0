import React, { useState } from 'react';
import { useUserAnalytics } from '../../../hooks/useUserAnalytics';
import { database } from '../../../firebase';
import { ref, update } from 'firebase/database';
import AnalyticsCard from './AnalyticsCard';
import SKODistributionChart from './SKODistributionChart';
import DataHistoryList from './DataHistoryList';
import UserNotes from './UserNotes';

function UserAnalytics({ userId }) {
  const { analytics, userData, loading } = useUserAnalytics(userId);
  const [showAddNote, setShowAddNote] = useState(false);
  const [note, setNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [error, setError] = useState('');

  const handleAddNote = async () => {
    if (!note.trim() || !userId) return;

    setAddingNote(true);
    setError('');

    try {
      const noteRef = ref(database, `users/${userId}/notes`);
      const noteData = {
        [`note_${Date.now()}`]: {
          content: note.trim(),
          timestamp: Date.now()
        }
      };

      await update(noteRef, noteData);
      setNote('');
      setShowAddNote(false);
    } catch (error) {
      console.error('Error adding note:', error);
      setError('Failed to add note. Please try again.');
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{userData?.username}</h1>
          <p className="text-gray-600">{userData?.email}</p>
        </div>
        <button
          onClick={() => setShowAddNote(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Note
        </button>
      </div>

      <UserNotes userId={userId} className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Readings"
          value={analytics.totalReadings}
          icon="chart-line"
          className="text-blue-600"
        />
        <AnalyticsCard
          title="Average SKO"
          value={analytics.averageSKO}
          icon="star"
          className="text-purple-600"
        />
        <AnalyticsCard
          title="Peak SKO"
          value={analytics.peakSKO}
          icon="arrow-up"
          className="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AnalyticsCard
          title="Average Muscle Voltage"
          value={analytics.averageVoltage}
          unit="mV"
          icon="bolt"
          className="text-orange-600"
        />
        <AnalyticsCard
          title="Peak Muscle Voltage"
          value={analytics.peakVoltage}
          unit="mV"
          icon="bolt"
          className="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card-gradient p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">SKO Distribution</h2>
          <SKODistributionChart distribution={analytics.skoDistribution} />
        </div>
        <div className="card-gradient p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <DataHistoryList history={analytics.recentHistory} />
        </div>
      </div>

      {showAddNote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Note</h2>
            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter note for user..."
              rows="4"
              disabled={addingNote}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddNote(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={addingNote}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                disabled={addingNote}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {addingNote ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAnalytics;