import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { PLANNING_POKER_VALUES, FAQ_ITEMS } from '../utils/constants';
import CardValuesPreview from '../components/CardValuesPreview';
import Header from '../components/Header';
import StatsGrid from '../components/StatsGrid';
import Footer from '../components/Footer';
import ContactInfo from '../components/ContactInfo';

const HomePage: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  
  const planningPokerValues = PLANNING_POKER_VALUES;

  const stats = [
    { id: 1, name: 'Active Rooms', value: '24', icon: '🏠' },
    { id: 2, name: 'Total Users', value: '156', icon: '👥' },
    { id: 3, name: 'Estimates Today', value: '42', icon: '📊' },
    { id: 4, name: 'Cards Played', value: '1,248', icon: '🃏' },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems = FAQ_ITEMS;

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const createRoom = () => {
    const roomId = crypto.randomUUID();
    
    const room = {
      id: roomId,
      name: username,
      createdAt: new Date(),
    };
    
    console.log(room);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header 
          title="Planning Poker"
          subtitle="Collaborative estimation for agile teams"
        />

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Create Room Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-200">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Create a Room</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Start a new planning session with your team</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>
              <button
                onClick={() => createRoom()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors duration-200"
              >
                Create New Room
              </button>
            </div>
          </div>

          {/* Join Room Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors duration-200">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Join a Room</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Enter a room ID to join an existing session</p>
            <div className="space-y-4">
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
                />
              </div>
              <button
                className="w-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-200 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                disabled={!roomId}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Card Values Preview */}
        <CardValuesPreview values={planningPokerValues} />

        {/* FAQ Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-200">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8">Everything you need to know about Planning Poker</p>
            
            <div className="max-w-3xl mx-auto space-y-2">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors duration-200">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={expandedIndex === index}
                    aria-controls={`faq-${index}`}
                  >
                    <span className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">{item.question}</span>
                    {expandedIndex === index ? (
                      <FiMinus className="h-5 w-5 text-indigo-600 flex-shrink-0 ml-4" />
                    ) : (
                      <FiPlus className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <div 
                    id={`faq-${index}`}
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${expandedIndex === index ? 'max-h-48 pb-4' : 'max-h-0'}`}
                    style={{
                      opacity: expandedIndex === index ? 1 : 0,
                      transform: `translateY(${expandedIndex === index ? '0' : '-10px'})`,
                      visibility: expandedIndex === index ? 'visible' : 'hidden'
                    }}
                    aria-hidden={expandedIndex !== index}
                  >
                    <div className="pb-2 text-gray-600 dark:text-gray-300 text-left">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact CTA */}
          <ContactInfo 
            title="Still have questions?"
            description="Our support team is here to help you get the most out of Planning Poker."
            buttonText="Contact Support"
            email="support@planningpoker.com"
            emailText="Or email us at"
          />
        </div>

        {/* Footer */}
        <Footer appName="Planning Poker App" />
      </div>
    </div>
  );
};

export default HomePage;
