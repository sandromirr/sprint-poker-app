import React, { useState, useEffect } from 'react';
import { PLANNING_POKER_VALUES } from '../utils/constants';
import CardValuesPreview from '../components/CardValuesPreview';
import Header from '../components/Header';
import StatsGrid from '../components/StatsGrid';
import Footer from '../components/Footer';
import ContactInfo from '../components/ContactInfo';
import FaqSection from '../components/FaqSection';
import CreateRoomForm from '../components/CreateRoomForm';
import JoinRoomForm from '../components/JoinRoomForm';
import type { StatItem } from '../models/stat-item';
import { fetchStats } from '../services/stats.service';
import { createRoom } from '../services/room.service';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const planningPokerValues = PLANNING_POKER_VALUES;
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const statsData = await fetchStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleCreateRoom = async (username: string) => {
    try {
      const { roomId } = await createRoom(username);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
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

        <StatsGrid 
          stats={stats} 
          loading={isLoading} 
        />

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