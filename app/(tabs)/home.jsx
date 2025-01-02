import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'


const Home = () => {
   const { data: posts, refetch } = useAppWrite(getAllPosts);
   const { data: latestPosts } = useAppWrite(getLatestPosts);
   const [refreshing, setRefreshing] = useState(false)

   const onRefresh = async () => {
      setRefreshing(true);
      console.log(`onRefresh() ${refreshing}`)
      await refetch();
      setRefreshing(false);
   }
   return (
      <SafeAreaView className="bg-primary h-full" edges={['top', 'left', 'right']}>
         <FlatList
            //data={[{id: 1}, {id: 2}, {id: 3}]}
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
               <VideoCard video={item}/>
            )}
            ListHeaderComponent={() => (
               <View className="my-6 px-4 space-y-6">
                  <View className="justify-between items-start flex-row mb-6">
                     <View>
                        <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                        <Text className="text-2xl font-psemibold text-white">Dan the man</Text>
                     </View>
                     <View className="mt-1.5">
                        <Image
                           source={images.logoSmall}
                           className="w-9 h-10"
                           resizeMode='contain'
                        />
                     </View>
                  </View>
                  <SearchInput />
                  <View className="w-full flex-1 pt-5 pb-8">
                     <Text className="text-gray-100 text-lg font-pregular mb-3 ">
                        Trending Videos
                     </Text>

                     <Trending posts={latestPosts ?? []} />

                  </View>
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyState
                  title="No Videos Found"
                  subtitle="Be the first one to upload a video" />
            )}
            refreshControl={
               <RefreshControl 
                  refreshing={refreshing}
                  onRefresh={onRefresh}
               />}
         />
      </SafeAreaView>
   )
}

export default Home