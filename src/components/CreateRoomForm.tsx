import React, { useState } from 'react';

interface CreateRoomFormProps {
  onSubmit: (username: string) => void;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Create a Room
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Start a new planning session with your team
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter your name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors duration-200"
        >
          Create New Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
