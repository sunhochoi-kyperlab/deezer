// import { set } from 'vue'
// import _ from '../js/lodash.custom'
export default {
  setLoadingState (state, isLoading) {
    state.isLoading = isLoading
  },
  setPlayingState (state, isPlaying) {
    state.isPlaying = isPlaying
  },
  setShuffleState (state, isSuffle) {
    state.isShuffle = isSuffle
  },
  setPlayMode (state, mode) {
    state.playMode = mode
    localStorage.setItem('deezer-music-mode', mode)
  },
  setLoggedinState (state, isloggedin) {
    state.isLoggedin = isloggedin
  },
  setAccessToken (state, token) {
    state.accessToken = token
  },
  setSelectAlbum (state, album) {
    state.albumInfo = album
  },
  setRadioList (state, list) {
    state.mixesList = list
  },
  setMusicList (state, list) {
    state.musicList = list
    state.shuffleList = createShuffleList(list)
    state.songIndex = list.findIndex((track) => {
      return track.id === state.selectTrack.id
    })
    localStorage.setItem('deezer-music-current-list', JSON.stringify(list))
  },
  setMyMusicList (state, list) {
    state.myMusicList = list
  },
  setAlbumList (state, list) {
    state.albumList = list
  },
  setTrackList (state, list) {
    state.trackList = list
  },
  setPlayList (state, list) {
    state.playLists = list
  },
  setArtistList (state, list) {
    state.artistList = list
  },
  setSelectTrack (state, music) {
    state.selectTrack = music
  },
  setSelectTrackDefault (state) {
    state.selectTrack = {
      id: null,
      title: 'Title',
      artist: 'Artist',
      album: 'Album',
      length: 0,
      url: null,
      cover: './image/default.png',
      cover_big: './image/default.png',
      favorite: true
    }
  },
  setSearchList (state, list) {
    state.searchList = list
  },
  setDuration (state, duration) {
    state.audio.duration = duration
  },
  setBuffered (state, buffered) {
    state.audio.buffered = buffered
  },
  setCurrentTime (state, currentTime) {
    state.audio.currentTime = currentTime
  },
  resetIndex (state) {
    state.selectTrack = state.musicList[0]
    state.songIndex = 0
    state.isPlaying = false
    state.audio.currentTime = 0
  },
  setRepeat (state, repeatIndex) {
    state.repeat = repeatIndex
  },
  nextMusic (state, newIndex) {
    state.selectTrack = state.musicList[newIndex]
    state.songIndex = newIndex
    state.audio.currentTime = 0
    state.audio.buffered = 0
    state.audio.duration = 0
    state.isPlaying = true
  },
  prevMusic (state, newIndex) {
    state.selectTrack = state.musicList[newIndex]
    state.songIndex = newIndex
    state.audio.currentTime = 0
    state.audio.buffered = 0
    state.audio.duration = 0
    state.isPlaying = true
  },
  nextRandomMusic (state, indexes) {
    state.selectTrack = state.shuffleList[indexes[0]]
    state.songIndex = indexes[1]
    state.audio.currentTime = 0
    state.audio.buffered = 0
    state.audio.duration = 0
    state.isPlaying = true
  },
  updateMusicUrl (state, url) {
    let newMusicInfo = Object.assign({}, state.selectTrack)
    newMusicInfo.url = url
    state.selectTrack = newMusicInfo
    localStorage.setItem('deezer-music-current-track', JSON.stringify(newMusicInfo))
    if (state.init) {
      state.isPlaying = true
    } else {
      state.init = true
    }
  },
  InitializeData (state) {
    state.isLoading = false
    state.isPlaying = false
    state.init = false
    state.playMode = ''
    state.isRandom = false
    state.isLoggedin = false
    state.isShuffle = false
    state.accessToken = null
    state.albumInfo = null
    state.recentlyList = []
    state.mixesList = []
    state.musicList = []
    state.myMusicList = []
    state.shuffleList = []
    state.albumList = []
    state.trackList = []
    state.playLists = []
    state.artistList = []
    state.selectTrack = {
      id: null,
      title: 'Title',
      artist: 'Artist',
      album: 'Album',
      length: 0,
      url: null,
      cover: './image/default.png',
      cover_big: './image/default.png',
      favorite: true
    }
    state.songIndex = 0
    state.repeat = 0
    state.searchList = []
    state.audio = {
      currentTime: 0,
      duration: 0,
      buffered: 0
    }
    // state.pageHistoryStack = []
    // state.returnPage = null
    localStorage.setItem('deezer-music-current-track', null)
    localStorage.setItem('deezer-music-current-list', null)
  },
  setSongIndex (state, newIndex) {
    state.songIndex = newIndex
  }
}

function createShuffleList (list) {
  let arr = list.slice()
  for (let c = arr.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1))
    var a = arr[c]
    arr[c] = arr[b]
    arr[b] = a
  }
  return arr
}
