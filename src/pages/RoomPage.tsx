import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayerList from '../components/PlayerList';
import PokerCardComponent from '../components/PokerCardComponent';
import RoomHeader from '../components/RoomHeader';
import { getUsersByRoomId } from '../services/user.service';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [users, setUsers] = useState<{ [key: string]: { 
    name: string; 
    card: string | null; 
    color: string;
  } }>({});
  
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showVotes, setShowVotes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await getUsersByRoomId(roomId!);
        setUsers(usersData.reduce((acc, user) => {
          acc[user.id] = {
            name: user.name,
            card: user.card,
            color: user.color
          };
          return acc;
        }, {} as { [key: string]: { name: string; card: string | null; color: string; } }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadUsers();
    
  }, [roomId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNewRound = () => {
    setShowVotes(false);
    setSelectedCard(null);
  };

  const handleRevealVotes = () => {
    setShowVotes(true);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <RoomHeader 
          roomId={roomId}
          users={users}
          showVotes={showVotes}
          isCopied={isCopied}
          handleRevealVotes={handleRevealVotes}
          handleNewRound={handleNewRound}
          copyToClipboard={copyToClipboard}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players List */}
          <PlayerList 
            users={users}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showVotes={showVotes}
          />

          {/* Poker Cards */}
          <PokerCardComponent 
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            showVotes={showVotes}
          />
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