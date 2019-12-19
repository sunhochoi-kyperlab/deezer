/**
 *  @namespace getter
 *  @desc get state
 *  @example in components
 *
 *  computed: mapGetters([
 *    'isLoading'
 *  ]),
 */
const getters = {
  getIsPlaying (state) {
    return state.isPlaying
  },
  getMode (state) {
    return state.playMode
  },
  getIsLoggedin (state) {
    return state.isLoggedin
  },
  getIsShuffle (state) {
    return state.isShuffle
  },
  getMixesList (state) {
    return state.mixesList
  },
  getMusicList (state) {
    return state.musicList
  },
  getMyMusicList (state) {
    return state.myMusicList
  },
  getAlbumList (state) {
    return state.albumList
  },
  getTrackList (state) {
    return state.trackList
  },
  getPlayLists (state) {
    return state.playLists
  },
  getArtistList (state) {
    return state.artistList
  },
  getSelectedTrack (state) {
    return state.selectTrack
  },
  getSelectedTrackUrl (state) {
    return state.selectTrack.url
  },
  getSongIndex (state) {
    return state.songIndex
  },
  getRepeat (state) {
    return state.repeat
  },
  getSearchList (state) {
    return state.searchList
  },
  getAudioInfo (state) {
    return state.audio
  }
}

export default getters

