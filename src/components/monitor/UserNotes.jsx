import React from 'react';

const UserNotes = ({ notes, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="h-4 bg-yellow-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-yellow-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return null;
  }

  const latestNote = notes[0];

  return (
    <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <i className="fas fa-sticky-note text-yellow-400"></i>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Latest Note from Admin</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{latestNote.content}</p>
            <p className="mt-1 text-xs text-yellow-500">
              {new Date(latestNote.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotes;