import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('your-project-id'); // Replace with your project ID

export const databases = new Databases(client);
export { ID, Query };