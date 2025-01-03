import {View, Text, Button} from 'react-native'
import React, {useState, useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ResizeMode, Video} from "expo-av";

const Create = () => {

   const video = useRef(null);
   const [status, setStatus] = useState({});

   return (
      <SafeAreaView>
         <View>
            <Video
               ref={video}
               style={{width:320, height:200, alignSelf: 'center'}}
               source={{
                  uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
               }}
               useNativeControls
               resizeMode={ResizeMode.CONTAIN}
               isLooping
               onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View>
               <Button
                  title={status.isPlaying ? 'Pause' : 'Play'}
                  onPress={() =>
                     status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                  }
               />
            </View>
         </View>
      </SafeAreaView>
   )
}

export default Create