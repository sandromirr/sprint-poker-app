import { Query, ID, client, account } from '../lib/appwrite';
import { Database } from '../lib/appwrite';
import appwriteConfig from '../config/appwrite';
import { stringToColor } from '../helpers/colors';
import type { RoomUser } from '../models/room-user';

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
      score: doc.score, 
      color: stringToColor(doc.username)
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const subscribeUsersInRoom = async (
  roomId: string,
  onChange: (users: RoomUser[]) => void
): Promise<() => void> => {
  // Ensure a valid (anonymous) session before subscribing
  try {
    await account.get();
  } catch {
    await account.createAnonymousSession();
  }

  // Seed with current users in the room
  const currentUsers = await getUsersByRoomId(roomId);
  const usersMap = new Map<string, RoomUser>(
    currentUsers.map(u => [u.id, u])
  );
  onChange(Array.from(usersMap.values()));

  const unsubscribe = client.subscribe(
    `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.collectionIds.users}.documents`,
    (res: any) => {
      const payload: any = res?.payload;
      if (!payload) return;
      if (payload.roomId !== roomId) return; // filter by room

      console.log(payload)
      
      const docId: string | undefined = payload.$id;
      const username: string | undefined = payload.username;
      const score: number | null = (payload.score ?? null) as number | null;

      const isCreate = res.events?.some((e: string) => e.includes(".create"));
      const isUpdate = res.events?.some((e: string) => e.includes(".update"));
      const isDelete = res.events?.some((e: string) => e.includes(".delete"));

      if (isDelete && docId) {
        usersMap.delete(docId);
        onChange(Array.from(usersMap.values()));
        return;
      }

      if ((isCreate || isUpdate) && docId && username) {
        usersMap.set(docId, {
          id: docId,
          name: username,
          score: score,
          color: stringToColor(username)
        });
        onChange(Array.from(usersMap.values()));
      }
    }
  );

  return unsubscribe;
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