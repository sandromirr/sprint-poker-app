import React, { useState } from 'react';

interface JoinRoomFormProps {
  onJoin: (roomId: string) => void;
}

const JoinRoomForm: React.FC<JoinRoomFormProps> = ({ onJoin }) => {
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      onJoin(roomId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Join a Room
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Enter a room ID to join an existing session
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter room ID"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!roomId.trim()}
          className="w-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-200 font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinRoomForm;
