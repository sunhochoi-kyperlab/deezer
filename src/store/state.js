const state = {
  isLoading: false,
  isPlaying: false,
  init: false,
  playMode: '',
  isLoggedin: false,
  isShuffle: false,
  accessToken: null,
  albumInfo: null,
  recentlyList: [],
  mixesList: [],
  musicList: [],
  myMusicList: [],
  shuffleList: [],
  albumList: [],
  trackList: [],
  playLists: [],
  artistList: [],
  selectTrack: {
    id: null,
    title: 'Title',
    artist: 'Artist',
    album: 'Album',
    length: 0,
    url: null,
    cover: './image/default.png',
    cover_big: './image/default.png',
    favorite: true
  },
  songIndex: 0,
  repeat: 0,
  searchList: [],
  audio: {
    currentTime: 0,
    duration: 0,
    buffered: 0
  },
  pageHistoryStack: [],
  returnPage: null
}

export default state
