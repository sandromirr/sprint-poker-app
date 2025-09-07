import React from 'react';
import { FaSearch, FaCheck, FaCrown } from 'react-icons/fa';

interface User {
  name: string;
  card: string | null;
  color: string;
}

interface PlayerListProps {
  users: { [key: string]: User };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showVotes: boolean;
}

const PlayerList: React.FC<PlayerListProps> = ({
  users,
  searchQuery,
  setSearchQuery,
  showVotes
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Participants</h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Object.values(users).filter(u => u.card).length} of {Object.keys(users).length} voted
              </div>
            </div>
          </div>
          <div className="mt-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search participants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
          {Object.entries(users)
            .filter(([_, user]) => 
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(([id, user]) => (
              <div 
                key={id}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <div 
                      className="relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-medium shadow-inner"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                      {id === '1' && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-0.5">
                          <FaCrown className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      {user.card && showVotes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">Voted: {user.card}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-2 flex-shrink-0">
                    {user.card && !showVotes ? (
                      <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <FaCheck className="text-green-500 dark:text-green-400 text-xs" />
                      </div>
                    ) : showVotes && user.card ? (
                      <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                        {user.card}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
