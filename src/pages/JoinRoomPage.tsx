import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/user.service';
import { LocalStorageManager } from '../utils/storage';
import { checkRoom } from '../services/room.service';

const JoinRoomPage: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const validateRoom = async () => {
      const roomId = window.location.pathname.split('/').pop();
      const isRoomIdValid = await checkRoom(roomId!);
      if (isRoomIdValid) {
        setRoomId(roomId!);
      } else {
        navigate('/not-found');
      }
    };
    validateRoom();
  }, [navigate]);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim() && username.trim()) {
      const userId = await createUser(roomId, username);
      LocalStorageManager.saveData({ roomId, userId });
      navigate(`/room/${roomId}`, { state: { username } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-md mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Join a Room
          </h1>
          
          <form onSubmit={handleJoinRoom} className="space-y-6">
            <div>
              <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
            >
              Join Room
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have a room?{' '}
              <button
                onClick={() => navigate('/')}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomPage;