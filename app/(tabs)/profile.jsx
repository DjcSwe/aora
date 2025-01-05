import React, {useState} from 'react'
import {router} from 'expo-router';
import {FlatList, TouchableOpacity, View, Image, ActivityIndicator, Text, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {deleteSessions, getUserPosts} from '../../lib/appwrite'
import useAppWrite from "../../lib/useAppwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import {icons} from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
   const { user, setUser, setisLoggedIn } = useGlobalContext();
   const { data: posts } = useAppWrite(() => getUserPosts(user.$id));
   const [spinner, setSpinner] = useState(false)

   async function logOut() {
      setSpinner(true)
      try {
         await deleteSessions()
         setUser(null)
         setisLoggedIn(false)
         router.replace("/sign-in")
      } catch (error) {
         Alert.alert("Sign Out Error", error.message);
         console.log("logout: ", error)
         setSpinner(false);
         throw error
      }
   }

   return (
      <SafeAreaView className="bg-primary h-full" edges={['top', 'left', 'right']}>
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
               <VideoCard video={item}/>
            )}
            ListHeaderComponent={() => (
               <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                  <TouchableOpacity
                     className='w-full items-end mb-10'
                     onPress={() => logOut()}
                  >
                     <Image
                        source={icons.logout}
                        resizeMode='contain'
                        className='w-6 h-6'
                     />
                  </TouchableOpacity>
                  <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                     <Image
                        source={{uri: user?.avatar }}
                        className="w-[90%] h-[90%] rounded-lg"
                        resizeMode='cover'
                     />
                  </View>
                  <InfoBox
                     title={user?.username}
                     containerStyles='mt-5'
                     titleStyles='text-lg'
                  />
                  <View className='mt-5 flex-row'>
                     <InfoBox
                        title={posts.length || 0}
                        subtitle="Posts"
                        containerStyles='mr-10'
                        titleStyles='text-xl'
                     />
                     <InfoBox
                        title="1.4k"
                        subtitle="Followers"
                        titleStyles='text-xl'
                     />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyState title="No Videos Found"/>
            )}
         />
         {spinner ? (
            <View>
               <ActivityIndicator size="large" />
               <Text className="text-center text-lg text-gray-100 font-pregular mt-4">
                  Signing out...
               </Text>
            </View>
         ) : null}
      </SafeAreaView>
   )
}

export default Profile