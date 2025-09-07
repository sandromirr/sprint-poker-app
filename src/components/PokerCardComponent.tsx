import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface PokerCardComponentProps {
  selectedCard: string | null;
  setSelectedCard: (card: string | null) => void;
  showVotes: boolean;
  isAdmin: boolean;
}

const POKER_CARDS = [
  '0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '∞', '☕'
];

const CARD_COLORS = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-yellow-500 to-yellow-600',
  'from-red-500 to-red-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
  'from-teal-500 to-teal-600',
  'from-orange-500 to-orange-600',
  'from-cyan-500 to-cyan-600',
  'from-fuchsia-500 to-fuchsia-600',
  'from-rose-500 to-rose-600',
  'from-violet-500 to-violet-600',
  'from-amber-500 to-amber-600'
];

const PokerCardComponent: React.FC<PokerCardComponentProps> = ({
  selectedCard,
  setSelectedCard,
  showVotes,
  isAdmin
}) => {
  return (
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
  );
};

export default PokerCardComponent;
