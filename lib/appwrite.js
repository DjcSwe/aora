import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

// Appwrite configuration values
export const config = {
   endpoint: "https://cloud.appwrite.io/v1",
   platform: "com.djcswe.aora",
   projectId: "674e2fc8003de408fcd1",
   databaseId: "674e34ca003df6f396e9",
   userCollectionId: "674e351f003c30198a0d",
   videoCollectionId: "674e356b000dadeaa5c6",
   storageId: "674e5d750021e7747cd8",
}

// Init your React Native SDK
const client = new Client();
client
   .setEndpoint(config.endpoint) // Your Appwrite Endpoint
   .setProject(config.projectId) // Your project ID
   .setPlatform(config.platform) // Your application ID or bundle ID.
   ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
   try { // create a new user
      const newAccount = await account.create(ID.unique(), email, password, username)
      if (!newAccount) {
         console.log("appwrite.js: no new account")
         throw Error
      } else {
         const avatarUrl = avatars.getInitials(username)
         await signIn(email, password);
         const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
               accountId: newAccount.$id,
               email,
               username,
               avatar: avatarUrl
            }
         );
         return newUser;
      }
   } catch (error) {
      console.log("appwrite.js", error)
      throw new Error(error);
   }
}

export async function signIn(email, password) {
   try {
      const session = await account.createEmailPasswordSession(email, password)
      return session;
   } catch (error) {
      console.log(error);
      throw new Error(error);
   }
}

export const checkActiveSession = async () => {
   try {
      const session = await account.getSession('current'); // Get the current session
      return session !== null; // Return true if there is an active session
   } catch (error) {
      // If there's an error (e.g., no active session), handle it appropriately
      if (error.code === 401) {
         return false; // No active session
      }
      throw error; // Re-throw other unexpected errors
   }
}

export const deleteSessions = async () => {
   try {
      // Get the list of all sessions
      const sessions = await account.listSessions();

      // Delete each session
      await Promise.all(
         sessions.sessions.map(async (session) => {
            await account.deleteSession(session.$id);
         })
      );
      
      console.log('All sessions deleted successfully');
   } catch (error) {
      console.error('Error deleting sessions:', error.message);
      throw error; // Re-throw the error for further handling
   }
}