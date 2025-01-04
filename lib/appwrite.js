import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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

export const signIn = async (email, password) => {
   try {
      const session = await account.createEmailPasswordSession(email, password)
      return session;
   } catch (error) {
      console.log(error);
      throw new Error(error);
   }
}

export async function checkActiveSession() {
   try {
      return await account.getSession('current');
   } catch (error) {
      console.log("checkActiveSession: ", error)
      return null
   }
}

export async function deleteSessions() {
   try {
      const sessions = await account.listSessions();
      await Promise.all(
         sessions.sessions.map(
            async (session) => {
               await account.deleteSession(session.$id);
            }
         )
      )
   } catch (error) {
      console.log("deleteSessions: ", error);
      throw error;
   }
}

export async function getCurrentUser() {
   try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
      const currentUser = await databases.listDocuments(
         config.databaseId,
         config.userCollectionId,
         [Query.equal('accountId',currentAccount.$id)]
      )
      if(!currentUser) throw Error;

      return currentUser.documents[0];
   } catch (error) {
      console.log("getCurrentUser: ", error);
   }
}

export async function getAllPosts() {
   try {
      const posts = await databases.listDocuments(
         config.databaseId,
         config.videoCollectionId
      )
      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
}

export async function getLatestPosts() {
   try {
      const posts = await databases.listDocuments(
         config.databaseId,
         config.videoCollectionId,
         [Query.orderDesc('$createdAt'), Query.limit(7)]
      )
      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
}

export async function searchPosts(query) {
   try {
      const posts = await databases.listDocuments(
         config.databaseId,
         config.videoCollectionId,
         [Query.search('title',query)]
      )
      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
}

export async function getUserPosts(userId) {
   try {
      const posts = await databases.listDocuments(
         config.databaseId,
         config.videoCollectionId,
         [Query.equal('creator',userId)]
      )
      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
}