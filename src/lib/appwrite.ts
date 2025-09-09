import { Client, Databases, Query, ID, Account } from 'appwrite';
import appwriteConfig from '../config/appwrite';

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
    
const account = new Account(client);
export const Database = new Databases(client);
export { ID, Query, client, account };