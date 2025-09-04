import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCheck, FaRedo, FaUserFriends, FaCrown, FaSearch, FaCopy } from 'react-icons/fa';
import { PLANNING_POKER_VALUES, CARD_COLORS } from '../utils/constants';
import ThemeToggle from '../components/ThemeToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const POKER_CARDS = PLANNING_POKER_VALUES;

// Function to generate a consistent color from a string
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
};

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [users, setUsers] = useState<{ [key: string]: { 
    name: string; 
    card: string | null; 
    color: string;
  } }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showVotes, setShowVotes] = useState(false);
  const [isAdmin] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Add some mock users for testing
  useEffect(() => {
    const mockUsers = {
      '1': { 
        name: 'You', 
        card: selectedCard, 
        color: stringToColor('You')
      },
      '2': { 
        name: 'Alex', 
        card: '8', 
        color: stringToColor('Alex')
      },
      '3': { 
        name: 'Jordan', 
        card: '13', 
        color: stringToColor('Jordan')
      },
      '4': { 
        name: 'Taylor', 
        card: '5', 
        color: stringToColor('Taylor')
      },
      '5': { 
        name: 'Casey', 
        card: '?', 
        color: stringToColor('Casey')
      },
      '6': { 
        name: 'Sandro', 
        card: null, 
        color: stringToColor('Sandro')
      }
    };
    setUsers(mockUsers);
  }, [selectedCard]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNewRound = () => {
    setShowVotes(false);
    setSelectedCard(null);
    // In a real app, you would also reset votes in the database
  };

  const handleRevealVotes = () => {
    setShowVotes(true);
  };

  const handleResetVotes = () => {
    setShowVotes(false);
    setSelectedCard(null);
    // In a real app, you would reset all votes in the database
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
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
                <>
                  <button
                    onClick={handleNewRound}
                    className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FaRedo className="mr-2" /> New Round
                  </button>
                  <button
                    onClick={handleResetVotes}
                    className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FaRedo className="mr-2" /> Reset All
                  </button>
                </>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players List */}
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
                            {isAdmin && id === '1' && (
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
                            <div className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm">
                              {user.card}
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                
                {Object.entries(users).filter(([_, user]) => 
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No participants found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Poker Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                    {showVotes ? 'Voting Results' : 'Select Your Estimate'}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {showVotes 
                      ? 'Discuss the results with your team' 
                      : 'Choose a card to cast your vote'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
                  {POKER_CARDS.map((card, index) => {
                    const isSelected = selectedCard === card;
                    const isDisabled = showVotes && !isSelected;
                    const cardColor = CARD_COLORS[index % CARD_COLORS.length];
                    
                    return (
                      <button
                        key={card}
                        onClick={() => !showVotes && setSelectedCard(card)}
                        disabled={isDisabled}
                        className={`
                          aspect-[2/3] flex items-center justify-center text-2xl font-bold rounded-lg
                          transition-all duration-200 transform hover:scale-105
                          border-2
                          ${
                            isSelected
                              ? `bg-gradient-to-br ${cardColor} text-white shadow-lg scale-105 border-transparent`
                              : isDisabled
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500 border-transparent cursor-not-allowed'
                              : `bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-md`
                          }
                        `}
                      >
                        {card}
                      </button>
                    );
                  })}
                </div>

                {selectedCard && !showVotes && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center px-5 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full border border-green-100 dark:border-green-800">
                      <FaCheck className="mr-2" />
                      <span>You voted: <strong>{selectedCard}</strong></span>
                    </div>
                  </div>
                )}
                
                {showVotes && (
                  <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Voting Complete</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {selectedCard 
                        ? `You voted: ${selectedCard}`
                        : 'You did not vote in this round.'
                      }
                    </p>
                    {isAdmin && (
                      <div className="mt-3 pt-3 border-t border-blue-100 dark:border-blue-800">
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">As the moderator, you can start a new round or reset all votes.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="dark:bg-gray-800 dark:text-white"
          progressClassName="dark:bg-blue-500"
        />
      </div>
    </div>
  );
};

export default RoomPage;