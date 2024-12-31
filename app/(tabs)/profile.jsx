import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { checkActiveSession, deleteSessions, signIn } from '../../lib/appwrite'
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {

   function logOut() {
      try {
         deleteSessions();
         router.replace("/sign-in")
      } catch (error) {
         console.log("logout: ", error)
         throw error
      }
   }

   return (
      <SafeAreaView>
         <Text>Profile</Text>
         <Button title='Log Out' onPress={logOut}/>
      </SafeAreaView>
   )
}

export default Profile

const styles = StyleSheet.create({})