import { ID, Query, client, account } from '../lib/appwrite';
import { Database } from '../lib/appwrite';
import { RoomStatus } from '../models/room-status';
import type { RoomData } from '../models/room-data';
import type { UserData } from '../models/user-data';
import appwriteConfig from '../config/appwrite';

export const createRoom = async (username: string) => {
  const roomId = ID.unique();
  const userId = ID.unique();

  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 30);
  
  const room: RoomData = {
    roomId: roomId,
    status: RoomStatus.Waiting,
    expireDate
  };

  const user: UserData = {
    roomId,
    username,
    score: null
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

export const updateRoomStatus = async (roomId: string, status: number): Promise<void> => {
  try {
    const rooms = await Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.rooms,
      [Query.equal('roomId', roomId)]
    );

    if (rooms.total === 0) return;

    const docId = rooms.documents[0].$id;

    await Database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.rooms,
      docId,
      { status }
    );
  } catch (error) {
    console.error('Error updating room status:', error);
  }
};

export const subscribeRoomData = async (
  roomId: string,
  onChange: (room: RoomData) => void
): Promise<() => void> => {
  // Ensure a valid (anonymous) session before subscribing
  try {
    await account.get();
  } catch {
    await account.createAnonymousSession();
  }

  // Seed with current room data
  const rooms = await Database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.collectionIds.rooms,
    [Query.equal('roomId', roomId)]
  );
  if (rooms.total > 0) {
    const doc = rooms.documents[0];
    onChange({ roomId: doc.roomId, status: doc.status, expireDate: new Date(doc.expireDate) });
  }

  const unsubscribe = client.subscribe(
    `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collectionIds.rooms}.documents`,
    (res: any) => {
      const payload: any = res?.payload;
      if (!payload) return;
      if (payload.roomId !== roomId) return;

      const isCreateOrUpdate = res.events?.some((e: string) => e.includes('.create') || e.includes('.update'));
      if (isCreateOrUpdate) {
        onChange({ roomId: payload.roomId, status: payload.status, expireDate: new Date(payload.expireDate) });
      }
    }
  );

  return unsubscribe;
};

