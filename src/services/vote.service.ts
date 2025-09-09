import { Database } from "../lib/appwrite";
import appwriteConfig from "../config/appwrite";
import { ID } from "../lib/appwrite";

export const createVote = async (userId: string, roomId: string, score: string): Promise<string> => {
    try {
        const voteId = ID.unique();
        await Database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionIds.votes,
            voteId,
            {
                userId,
                roomId,
                score
            }
        );
        return voteId;
    } catch (error) {
        console.error('Error creating vote:', error);
        throw error;
    }
};