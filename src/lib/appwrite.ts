import { Client, Databases, Query, ID } from 'appwrite';
import appwriteConfig from '../config/appwrite';

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

export const Database = new Databases(client);
export { ID, Query };