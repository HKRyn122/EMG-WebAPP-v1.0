import React from 'react';
import { useUserNotes } from '../../../hooks/useUserNotes';

function UserNotes({ userId, className = '' }) {
  const { notes, loading } = useUserNotes(userId);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-50 p-4 rounded-lg ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {notes.map((note) => (
        <div key={note.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-sm text-yellow-800">{note.content}</p>
          <p className="text-xs text-yellow-600 mt-1">
            {new Date(note.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserNotes;