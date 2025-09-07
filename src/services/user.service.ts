import { Query, ID } from '../lib/appwrite';
import { Database } from '../lib/appwrite';
import appwriteConfig from '../config/appwrite';
import { stringToColor } from '../helpers/colors';

export interface RoomUser {
  id: string;
  name: string;
  card: string | null;
  color: string;
}

export const getUsersByRoomId = async (roomId: string): Promise<RoomUser[]> => {
  try {
    const response = await Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      [
        Query.equal('roomId', roomId)
      ]
    );
    
    return response.documents.map(doc => ({
      id: doc.$id,
      name: doc.username,
      card: null, // Will be updated when user votes
      color: stringToColor(doc.username)
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (roomId: string, username: string): Promise<string> => {
  try {
    const response = await Database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      ID.unique(),
      {
        roomId,
        username
      }
    );
    
    return response.$id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};