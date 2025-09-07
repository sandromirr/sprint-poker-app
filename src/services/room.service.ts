import { ID } from '../lib/appwrite';
import { Database } from '../lib/appwrite';
import { RoomStatus } from '../models/room-status';
import type { RoomData } from '../models/room-data';
import type { UserData } from '../models/user-data';
import appwriteConfig from '../config/appwrite';
import { generateToken } from '../helpers/token';

export const createRoom = async (username: string) => {
  const token = generateToken();
  const roomId = ID.unique();
  const userId = ID.unique();

  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);
  
  const room: RoomData = {
    token,
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
