import {View, Button} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useVideoPlayer, VideoView} from "expo-video";
import {useEvent} from "expo";

const Bookmark = () => {

   // Video Player

   //const videoSource = 'https://youtu.be/KpRVAR_emBY?si=rt9VPmcMhYEwNa4k';
   const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
   const player = useVideoPlayer(videoSource, player => {
      player.loop = true;
      player.play();
   });
   const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
   return (
      <SafeAreaView>
         <View className="items-center bg-primary">
            <VideoView style={{width:350, height:275}} player={player} allowsFullscreen allowsPictureInPicture />
            <View>
               <Button
                  title={isPlaying ? 'Pause' : 'Play'}
                  onPress={() => {
                     if (isPlaying) {
                        player.pause();
                     } else {
                        player.play();
                     }
                  }}
               />
            </View>
         </View>
      </SafeAreaView>
   )
}
export default Bookmark