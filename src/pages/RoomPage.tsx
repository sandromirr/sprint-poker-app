import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayerList from '../components/PlayerList';
import PokerCardComponent from '../components/PokerCardComponent';
import RoomHeader from '../components/RoomHeader';
import { resetUsersScore, subscribeUsersInRoom, updateUserScore } from '../services/user.service';
import type { RoomUser } from '../models/room-user';
import { createVote } from '../services/vote.service';
import { subscribeRoomData, updateRoomStatus } from '../services/room.service';
import { RoomStatus } from '../models';
import type { RoomData } from '../models/room-data';

const RoomPage: React.FC = () => {
  const { roomId, userId } = useParams<{ roomId: string, userId: string }>();
  const [users, setUsers] = useState<{ [key: string]: RoomUser }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showVotes, setShowVotes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  void roomData; // referenced to avoid unused variable warning; updates drive other state

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      if (!roomId) return;
      unsubscribe = await subscribeUsersInRoom(roomId, (list) => {
        const next = list.reduce((acc, user) => {
          acc[user.id] = { id: user.id, name: user.name, score: user.score, color: user.color };
          return acc;
        }, {} as { [key: string]: RoomUser });
        setUsers(next);
      });
    })();
    return () => { if (unsubscribe) unsubscribe(); };
  }, [roomId]);

  // Subscribe to realtime room data
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      if (!roomId) return;
      unsubscribe = await subscribeRoomData(roomId, (room) => {
        console.log('room updated', room)
        setRoomData(room);
        if(room.status == RoomStatus.Revealed){
          setShowVotes(room.status == RoomStatus.Revealed);
        }else{
          setSelectedCard(null);
          setShowVotes(room.status == RoomStatus.Revealed);
        }
      });
    })();
    return () => { if (unsubscribe) unsubscribe(); };
  }, [roomId]);

  const copyToClipboard = () => {
    const link = window.location.href.replace("room","join").split('/');
    link.pop();
    navigator.clipboard.writeText(link.join('/'));
    setIsCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNewRound = async () => {
    setShowVotes(false);
    setSelectedCard(null);
    await resetUsersScore(roomId!);
    await updateRoomStatus(roomId!, RoomStatus.Voting);
  };

  const handleRevealVotes = async () => {
    setShowVotes(true);
    await updateRoomStatus(roomId!, RoomStatus.Revealed);
  };

  const onSelectCard = async (score: string | null) => {
    setSelectedCard(score);
    await updateUserScore(userId!, score!);
    await createVote(userId!, roomId!, score!);
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
            setSelectedCard={(card) => onSelectCard(card)}
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