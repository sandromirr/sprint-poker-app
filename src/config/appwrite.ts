const config = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || '',
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '',
  databaseId: import.meta.env.VITE_DATABASE_ID || '',
  collectionIds: {
    rooms: 'rooms',
    users: 'users',
    votes: 'votes'
  }
};

export default config;