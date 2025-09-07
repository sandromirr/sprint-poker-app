import { ID, Query } from '../lib/appwrite';
import { Database } from '../lib/appwrite';
import { RoomStatus } from '../models/room-status';
import type { RoomData } from '../models/room-data';
import type { UserData } from '../models/user-data';
import appwriteConfig from '../config/appwrite';

export const createRoom = async (username: string) => {
  const token = ID.unique();
  const roomId = ID.unique();
  const userId = ID.unique();

  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);
  
  const room: RoomData = {
    roomId: token,
    status: RoomStatus.Waiting,
    expireDate
  };

  const user: UserData = {
    roomId,
    username
  };
  
  await Database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionIds.rooms,
    roomId,
    room
  );

  await Database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionIds.users,
    userId,
    user
  );

  return { roomId, userId };
};

export const checkRoom = async (roomId: string) => {
  try {
    const rooms = await Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.rooms,
      [Query.equal('roomId', roomId)]
    );

    if(rooms.total == 0) {
      return false;
    }

    const room = rooms.documents[0];

    if (new Date(room.expireDate) < new Date()) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};