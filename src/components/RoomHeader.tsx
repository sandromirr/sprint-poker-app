import React from 'react';
import { FaUserFriends, FaRedo, FaCopy, FaCheck } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

interface User {
  name: string;
  card: string | null;
  color: string;
}

interface RoomHeaderProps {
  roomId: string | undefined;
  users: { [key: string]: User };
  isAdmin: boolean;
  showVotes: boolean;
  isCopied: boolean;
  handleRevealVotes: () => void;
  handleNewRound: () => void;
  copyToClipboard: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  roomId,
  users,
  isAdmin,
  showVotes,
  isCopied,
  handleRevealVotes,
  handleNewRound,
  copyToClipboard
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sprint Poker</h1>
          <div className="ml-4 flex items-center text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full transition-colors duration-200">
            <FaUserFriends className="mr-2" />
            <span className="font-mono">#{roomId?.toUpperCase()}</span>
            <span className="mx-2">•</span>
            <span>{Object.keys(users).length} Players</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-3">
          {isAdmin && !showVotes && (
            <button
              onClick={handleRevealVotes}
              className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center justify-center"
            >
              <FaCheck className="mr-2" /> Show Votes
            </button>
          )}
          
          {isAdmin && showVotes && (
            <button
              onClick={handleNewRound}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center justify-center"
            >
              <FaRedo className="mr-2" /> New Round
            </button>
          )}
          
          <button
            onClick={copyToClipboard}
            className={`px-5 py-2.5 border rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
              isCopied 
                ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' 
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <FaCopy className="mr-2" />
            {isCopied ? 'Copied!' : 'Copy Invite Link'}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
