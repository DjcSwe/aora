import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { searchPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import { useLocalSearchParams } from "expo-router";


const Search = () => {
   const { query } = useLocalSearchParams();
   const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

   useEffect(() => {
      refetch()
   },[query])
   return (
      <SafeAreaView className="bg-primary h-full" edges={['top', 'left', 'right']}>
         <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
               <VideoCard video={item}/>
            )}
            ListHeaderComponent={() => (
               <View className="my-6 px-4">
                  <View className="mt-6 mb-8">
                     <SearchInput initialQuery={query}/>
                  </View>
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyState title="No Videos Found"/>
            )}
         />
      </SafeAreaView>
   )
}

export default Search