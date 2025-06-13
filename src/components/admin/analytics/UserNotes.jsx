import React from 'react';
import { useUserNotes } from '../../../hooks/useUserNotes';

function UserNotes({ userId, onDeleteNote, className = '' }) {
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
      <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm text-yellow-800">{note.content}</p>
              <p className="text-xs text-yellow-600 mt-1">
                {new Date(note.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onDeleteNote(note.id)}
              className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
              title="Delete note"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserNotes;