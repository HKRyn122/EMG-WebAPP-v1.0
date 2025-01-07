import React from 'react';
import { useUserNotes } from '../../hooks/useUserNotes';
import { useOfflineStorage } from '../../hooks/useOfflineStorage';
import { useAuth } from '../../hooks/useAuth';

function AdminNotes() {
  const { user } = useAuth();
  const { notes, loading } = useUserNotes(user?.uid);
  const [offlineNotes] = useOfflineStorage(`notes_${user?.uid}`);

  // Use offline notes if online notes are not available
  const displayNotes = loading || !notes ? offlineNotes : notes;

  if (!displayNotes?.length) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Notes</h2>
      <div className="space-y-4">
        {displayNotes.map((note) => (
          <div key={note.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-yellow-800">{note.content}</p>
            <p className="text-xs text-yellow-600 mt-1">
              {new Date(note.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminNotes;