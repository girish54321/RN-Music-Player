import React from 'react'
import { Slider, View, Text } from 'react-native'
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player'
import { CoverArt } from './coverArt'

export const MediaPlayertComponet = ({
  title,
  singerName,
  imageUrl,
  playbackState,
  duration,
  currentTime
}) => {
  function ProgressBar() {
    const progress = useTrackPlayerProgress()
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between'
          }}>
          <Text>{formMateTime(progress.position)}</Text>
          <Text>{formMateTime(progress.duration)}</Text>
        </View>
        <Slider
          step={1}
          value={progress.position === 0 ? currentTime : progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          disabled={playbackState !== TrackPlayer.STATE_PLAYING ? true : false}
          onSlidingComplete={async value => {
            // console.log("GO TO ", value);
            TrackPlayer.seekTo(value)
          }}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10
          }}
        />
      </View>
    )
  }

  const formMateTime = secconed => {
    let dateObj = new Date(secconed * 1000)
    let hours = dateObj.getUTCHours()
    let minutes = dateObj.getUTCMinutes()
    let seconds = dateObj.getSeconds()
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    )
  }

  return (
    <View style={{ padding: 16 }}>
      <CoverArt
        title={title}
        subtitle={singerName}
        imageUrl={imageUrl}
        small={false}
      />
      <View style={{ marginTop: 18 }} />
      <Text>{title}</Text>
      <View style={{ marginTop: 12 }} />
      <ProgressBar />
    </View>
  )
}
