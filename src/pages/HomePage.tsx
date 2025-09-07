import React from 'react';
import { PLANNING_POKER_VALUES } from '../utils/constants';
import CardValuesPreview from '../components/CardValuesPreview';
import Header from '../components/Header';
import StatsGrid from '../components/StatsGrid';
import Footer from '../components/Footer';
import ContactInfo from '../components/ContactInfo';
import FaqSection from '../components/FaqSection';
import CreateRoomForm from '../components/CreateRoomForm';
import JoinRoomForm from '../components/JoinRoomForm';

const HomePage: React.FC = () => {
  const planningPokerValues = PLANNING_POKER_VALUES;

  const stats = [
    { id: 1, name: 'Active Rooms', value: '24', icon: '🏠' },
    { id: 2, name: 'Total Users', value: '156', icon: '👥' },
    { id: 3, name: 'Estimates Today', value: '42', icon: '📊' },
    { id: 4, name: 'Cards Played', value: '1,248', icon: '🃏' },
  ];

  const handleCreateRoom = (username: string) => {
    const roomId = crypto.randomUUID();
    
    const room = {
      id: roomId,
      name: username,
      createdAt: new Date(),
    };
    
    console.log(room);
  };

  const handleJoinRoom = (roomId: string) => {
    console.log('Joining room:', roomId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <Header 
          title="Planning Poker"
          subtitle="Collaborative estimation for agile teams"
        />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <CreateRoomForm onSubmit={handleCreateRoom} />
          <JoinRoomForm onJoin={handleJoinRoom} />
        </div>

        <StatsGrid stats={stats} />

        <CardValuesPreview values={planningPokerValues} />

        <FaqSection />  

        <ContactInfo 
          title="Still have questions?"
          description="Our support team is here to help you get the most out of Planning Poker."
          buttonText="Contact Support"
          email="support@planningpoker.com"
          emailText="Or email us at"
        />

        <Footer appName="Planning Poker App" />
      </div>
    </div>
  );
};

export default HomePage;
