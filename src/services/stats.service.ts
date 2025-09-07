import { Database, Query } from '../lib/appwrite';
import appwriteConfig from '../config/appwrite';
import type { StatItem } from '../models';

export const fetchStats = async (): Promise<StatItem[]> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [activeRooms, totalUsers, todayVotes, allVotes] = await Promise.all([
    Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.rooms,
      [Query.greaterThan('expireDate', new Date().toISOString())]
    ),
    Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      [Query.limit(1)]
    ),
    Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.votes,
      [Query.greaterThan('$createdAt', today.toISOString())]
    ),
    Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.votes,
      [Query.limit(1)]
    )
  ]);

  return [
    { id: 1, name: 'Active Rooms', value: activeRooms.total.toString(), icon: '🏠' },
    { id: 2, name: 'Total Users', value: totalUsers.total.toString(), icon: '👥' },
    { id: 3, name: 'Estimates Today', value: todayVotes.total.toString(), icon: '📊' },
    { id: 4, name: 'Cards Played', value: allVotes.total.toString(), icon: '🃏' },
  ];
};
