import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/room/${roomId}`, { state: { username } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Join Room: {roomId}
          </h1>
          
          <form onSubmit={handleJoinRoom} className="space-y-6">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join Room
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Want to create a different room?{' '}
              <button
                onClick={() => navigate('/')}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
