import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StatusBar, Alert } from 'react-native'
import styles from './MediaPlayer.style'
import TrackPlayer, { usePlaybackState } from 'react-native-track-player'
import { Container, Content, Button, Icon } from 'native-base'
import { MediaPlayertComponet } from '../MediaPlayer/mediaComponet/MediaPlayertComponet'
const MediaPlayer = ({ route }) => {
  const [currentTime, setCurrentTime] = useState()
  const [duration, setDuration] = useState()
  const [paused, setPaused] = useState()
  const [playBackItem, setplayBackItem] = useState()
  const playbackState = usePlaybackState()

  useEffect(() => {
    startPlayer()
  }, [])

  useEffect(() => {
    let onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async data => {
        getCurrentTrackData(data.nextTrack)
      }
    )
    return () => {
      onTrackChange.remove()
    }
  }, [])

  const startPlayer = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack == null) {
      setup()
      setTimeout(() => {
        getCurrentTrackData()
      }, 400)
    } else {
      addToPlayList()
      setTimeout(() => {
        getCurrentTrackData()
      }, 400)
    }
  }

  const addToPlayList = () => {
    TrackPlayer.add(route.params.data)
      .then(() => {
        setTimeout(() => {
          TrackPlayer.getCurrentTrack().then(id => {
            getCurrentTrackData(id)
          })
          console.log('Added To PlayList')
        }, 500)
      })
      .catch(e => {
        console.log('Error Adding to playList', e)
      })
  }

  const getCurrentTrackData = id => {
    TrackPlayer.getTrack(id).then(data => {
      let trackObject = data
      let myObj = {
        id: trackObject.id,
        artist: trackObject.artist,
        artwork: trackObject.artwork,
        title: trackObject.title,
        url: trackObject.url
      }
      setplayBackItem(myObj)
    })
  }

  async function setup() {
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_JUMP_FORWARD
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_JUMP_FORWARD
      ]
    })
    togglePlayback()
  }
  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack == null) {
      await TrackPlayer.add(route.params.data)
      await TrackPlayer.play().then(async () => {
        setPaused(false)
        let position = await TrackPlayer.getPosition()
        let duration = await TrackPlayer.getDuration()
        setDuration(duration)
        setCurrentTime(position)
      })
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play().then(async () => {
          setPaused(false)
          let position = await TrackPlayer.getPosition()
          let duration = await TrackPlayer.getDuration()
          setDuration(duration)
          setCurrentTime(position)
        })
      } else {
        await TrackPlayer.pause().then(async () => {
          setPaused(true)
          let position = await TrackPlayer.getPosition()
          let duration = await TrackPlayer.getDuration()
          setDuration(duration)
          setCurrentTime(position)
        })
      }
      setTimeout(() => {
        // getCurrentTrackData()
      }, 400)
    }
  }

  const goBackwards = () => {
    TrackPlayer.skipToPrevious()
  }
  const goForward = () => {
    TrackPlayer.skipToNext()
  }

  const stopPlayBack = () => {
    if (
      playbackState === TrackPlayer.STATE_PLAYING ||
      playbackState === TrackPlayer.STATE_PAUSED
    ) {
      Alert.alert(
        playBackItem.title,
        'Stop Player?',
        [
          {
            text: 'No',
            onPress: () => console.log()
          },
          {
            text: 'Yes',
            onPress: () => {
              TrackPlayer.stop().then(() => {
                setCurrentTime(0)
                setDuration(0)
                TrackPlayer.destroy()
              })
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView1}>
        <Container style={styles.mainView}>
          <Content>
            <MediaPlayertComponet
              title={playBackItem ? playBackItem.title : ''}
              singerName={playBackItem ? playBackItem.artist : ''}
              imageUrl={playBackItem ? playBackItem.artwork : ''}
              currentTime={currentTime}
              duration={duration}
              playbackState={playbackState}
            />
            <View style={styles.buttonRow}>
              <Button iconcenter dark onPress={goBackwards}>
                <Icon name="step-backward" type="FontAwesome" />
              </Button>
              <Button iconcenter dark onPress={togglePlayback}>
                <Icon name={paused ? 'play' : 'pause'} type="FontAwesome" />
              </Button>
              <Button iconcenter dark onPress={stopPlayBack}>
                <Icon name="stop" type="FontAwesome" />
              </Button>
              <Button iconcenter dark onPress={goForward}>
                <Icon name="step-forward" type="FontAwesome" />
              </Button>
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    </>
  )
}

export default MediaPlayer
