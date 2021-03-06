import TrackPlayer from 'react-native-track-player'

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play()
  })
  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause()
  })
  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.pause().then(() => {
      TrackPlayer.destroy()
    })
  })
  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.pause().then(async () => {
      await TrackPlayer.destroy()
    })
  })
  TrackPlayer.addEventListener('remote-jump-forward', () => {
    TrackPlayer.skipToNext()
  })
  TrackPlayer.addEventListener('remote-jump-backward', () => {
    TrackPlayer.skipToPrevious()
  })
}
