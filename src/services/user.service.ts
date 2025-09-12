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

    const userId = await getUserIdInRoom(roomId, username);

    if(userId !== null)
    {
      return userId;
    }

    const online = true;
    const response = await Database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      ID.unique(),
      {
        roomId,
        username,
        online
      }
    );
    
    return response.$id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserIdInRoom = async (roomId: string, username: string): Promise<string | null> => {
  try {
    const response = await Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      [
        Query.equal('roomId', roomId),
        Query.equal('username', username)
      ]
    );
    const first = response.documents?.[0];
    return first ? first.$id : null;
  } catch (error) {
    console.error('Error getting user id in room:', error);
    return null;
  }
};

export const resetUsersScore = async (roomId: string): Promise<void> => {
  try{
    const response = await Database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      [Query.equal('roomId', roomId)]
    );

    const updatePromises = response.documents.map(doc => 
      Database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionIds.users,
        doc.$id,
        { score: null, online: false }
      )
    );
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error resetting user scores:', error);
    throw error;
  }
};

export const updateUserScore = async (userId: string, score: string): Promise<void> => {
  try {
    await Database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      userId,
      { score: score, online: true }
    );
  } catch (error) {
    console.error('Error updating user score:', error);
    throw error;
  }
};

export const setUserOnlineStatus = async (userId: string, online: boolean): Promise<void> => {
  try {
    await Database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionIds.users,
      userId,
      { online }
    );
  } catch (error) {
    console.error('Error updating user online status:', error);
    // Best-effort; don't rethrow to avoid breaking callers on visibility change
  }
};