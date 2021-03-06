import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import styles from './Home.style'
import Icon from 'react-native-vector-icons/Ionicons'
import TrackPlayer, { usePlaybackState } from 'react-native-track-player'
const Home = ({ navigation }) => {
  const playbackState = usePlaybackState()
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView1}>
        <View style={styles.outerWrapper}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={'musical-notes-outline'} size={100} color={'purple'} />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                navigation.navigate('Play List')
              }}>
              <Text>Go To PlayList</Text>
            </TouchableOpacity>
          </View>
          {playbackState == TrackPlayer.STATE_PLAYING ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Icon
                  name={'musical-notes-outline'}
                  size={55}
                  color={'purple'}
                />
                <Text>Song Name</Text>
              </View>
              <TouchableOpacity
                style={[styles.buttonStyle, { backgroundColor: 'pink' }]}
                onPress={() => {
                  navigation.navigate('MediaPlayer', { data: null })
                }}>
                <Text>Go To Player</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  )
}

export default Home
