/**
 *  @namespace Action creater
 *  @desc commit or dispatch action, do ajax action
 */
import Utils from 'obigo-js-ui/utils'
import handler from '@/js/errorHandler'
import { Popup } from '@/js/Popup'
import i18n from '@/i18n/index'
import router from '../router'

const TIME_OUT = 5 * 1000
const BASE_URL = `https://api.deezer.com`

let internetConnectionFailConut = 0

export function getEditional ({commit, dispatch, state}, {type, callback}) {
  commit('setLoadingState', true)
  const url = `${BASE_URL}/editorial/0/${type}`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      commit('setAlbumList', res.data.data)
      commit('setLoadingState', false)
      internetConnectionFailConut = 0
      callback()
    })
    .catch(err => {
      commit('setLoadingState', false)
      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getEditional', {type, callback})
        }
      })
    })
}

export function getTracks ({commit, dispatch, state}, {type, id, callback, album}) {
  commit('setLoadingState', true)
  const url = (type === 'artist') ? `${BASE_URL}/${type}/${id}/top?limit=50` : `${BASE_URL}/${type}/${id}/tracks`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      let list = album ? convertTrackListForAlbum(res.data.data, album) : res.data.data
      commit('setTrackList', list)
      internetConnectionFailConut = 0
      callback()
    })
    .catch(err => {
      commit('setLoadingState', false)
      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getTracks', {type, id, callback, album})
        }
      })
    })
}

function convertTrackListForAlbum (trackList, album) {
  let list = []
  trackList.map(track => {
    list.push({
      album: (track.album) ? track.album : album,
      artist: track.artist,
      duration: track.duration,
      id: track.id,
      link: track.link,
      position: track.position,
      preview: track.preview,
      rank: track.rank,
      title: track.title,
      title_short: track.title_short,
      type: track.type
    })
  })
  return list
}

export function getRadioList ({commit, dispatch, state}, {type, callback}) {
  commit('setLoadingState', true)
  type = divideType(type)

  // top, genres, lists
  const url = `${BASE_URL}/radio/${type}`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      commit('setRadioList', res.data.data)
      internetConnectionFailConut = 0
      callback(res.data.data)
    })
    .catch(err => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getRadioList', {type, callback})
        }
      })
    })
}

export function getTrackFromRadio ({commit, state, dispatch}, {id, callback}) {
  commit('setLoadingState', true)
  const url = `${BASE_URL}/radio/${id}/tracks`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      commit('setMusicList', res.data.data)
      dispatch('getMusic', {})
      commit('setPlayingState', true)
      internetConnectionFailConut = 0
      callback()
    })
    .catch(err => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getTrackFromRadio', {id, callback})
        }
      })
    })
}

export function getCharts ({commit, dispatch, state}, {type, callback}) {
  type = divideType(type)
  commit('setLoadingState', true)

  const url = `${BASE_URL}/chart/0/${type}`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      const list = res.data.data
      switch (type) {
        case 'tracks':
          commit('setTrackList', list)
          break
        case 'playlists':
          commit('setPlayList', list)
          break
        case 'artists':
          commit('setArtistList', list)
          break
        case 'albums':
          commit('setAlbumList', list)
          break
        default:
          console.log('unknown chart mode')
          break
      }
      internetConnectionFailConut = 0
      callback()
    })
    .catch(err => {
      commit('setLoadingState', false)
      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getCharts', {type, callback})
        }
      })
    })
}

export function getMyMusicForInit ({commit, dispatch, state}) {
  commit('setLoadingState', true)
  const url = `${BASE_URL}/user/me/tracks`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      const list = res.data.data
      commit('setMyMusicList', list)
      commit('setLoadingState', false)
      internetConnectionFailConut = 0
      dispatch('initDataFromLocalStorage')
    })
    .catch((err) => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getMyMusicForInit')
        }
      })
    })
}

export function getMyMusic ({commit, dispatch, state}, {type, callback}) {
  commit('setLoadingState', true)
  type = divideType(type)

  const url = `${BASE_URL}/user/me/${type}`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      const list = res.data.data
      switch (type) {
        case 'history':
        case 'tracks':
          commit('setTrackList', list)
          commit('setMyMusicList', list)
          break
        case 'playlists':
          commit('setPlayList', list)
          break
        case 'artists':
          commit('setArtistList', list)
          break
        case 'albums':
          commit('setAlbumList', list)
          break
        default:
          console.log('unknown my music')
          break
      }
      internetConnectionFailConut = 0
      callback()
    })
    .catch(err => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getMyMusic', {type, callback})
        }
      })
    })
}

export function getFlows ({commit, state, dispatch}, {callback}) {
  commit('setLoadingState', true)
  const url = `${BASE_URL}/user/me/flow`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      commit('setSelectTrack', res.data.data[0])
      commit('setMusicList', res.data.data)
      dispatch('getMusic', {})
      commit('setPlayingState', true)
      commit('setLoadingState', false)
      internetConnectionFailConut = 0
      callback()
    })
    .catch(err => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('getFlows', {callback})
        }
      })
    })
}

export function searchMusic ({commit, dispatch, state}, {type, content, callback}) {
  commit('setLoadingState', true)
  const url = `${BASE_URL}/search?q=${type}:"${content}"`
  Utils.ajax
    .get({
      url: url,
      dataType: 'json',
      timeout: TIME_OUT,
      data: {
        access_token: state.accessToken
      }
    })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      commit('setSearchList', res.data.data)
      internetConnectionFailConut = 0
      callback(res.data.data)
      commit('setLoadingState', false)
    })
    .catch((err) => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('searchMusic', {type, content, callback})
        }
      })
    })
}

export function updateCurrentTime ({commit}, currentTime) {
  commit('setCurrentTime', currentTime)
}

export function updateBuffered ({commit}, buffered) {
  commit('setBuffered', buffered)
}

export function updateDuration ({commit}, duration) {
  commit('setDuration', duration)
}

export function onAudioEnded ({state, dispatch, commit}) {
  if (state.playMode.trim() !== '') {
    // flow or mix
    dispatch('nextMusic')
  } else if (state.isShuffle) {
    dispatch('nextRandomMusic')
  } else {
    if (state.repeat === 0 && state.songIndex === (state.musicList.length - 1)) {
      commit('resetIndex')
    } else {
      dispatch('nextMusic')
    }
  }
}

export function nextRandomMusic ({commit, state, dispatch}) {
  const currentSongID = state.selectTrack.id
  const shuffleList = state.shuffleList
  const range = shuffleList.length
  let randomIndex = Math.floor(Math.random() * range)

  if (range === 1) {
    randomIndex = 0
  } else {
    while (shuffleList[randomIndex].id === currentSongID) {
      randomIndex = Math.floor(Math.random() * range)
    }
  }
  const songIndex = getSongIndex(state.musicList, shuffleList[randomIndex].id)
  commit('nextRandomMusic', [randomIndex, songIndex])
  dispatch('getMusic', {songIndex})
}

export function nextMusic ({commit, state, dispatch}) {
  let newIndex = (state.musicList.length === 1) ? 0 : (state.songIndex < state.musicList.length - 1) ? state.songIndex + 1 : 0
  commit('nextMusic', newIndex)
  dispatch('getMusic', {songIndex: newIndex})
}

export function prevMusic ({commit, state, dispatch}) {
  let newIndex = state.musicList.length - 1
  if (state.songIndex !== 0) {
    newIndex = state.songIndex - 1
  }
  commit('prevMusic', newIndex)
  dispatch('getMusic', {songIndex: newIndex})
}

export function getMusic ({ commit, state, dispatch }, { songIndex = 0, callback = () => {} }) {
  commit('setLoadingState', true)
  const getMusicURL = 'http://210.216.54.58/deezer/get.php'
  const trackId = state.musicList[songIndex].id

  Utils.ajax.get({
    url: getMusicURL,
    dataType: 'json',
    timeout: TIME_OUT,
    data: {
      trackId: trackId
    }
  })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      // If url does not exist, pop up and play next song
      const url = res.data.url
      if (url && url.trim() !== '') {
        commit('updateMusicUrl', url)
        console.log(Date.now() + ' : Songs url  -  ' + url)
        // commit('setLoadingState', false)
        internetConnectionFailConut = 0
        callback()
      } else {
        Popup.showNoticePopup({
          title: i18n.t('POPUP_TITLE_TRACK_ERROR'),
          content: i18n.t('POPUP_CONTENT_TRACK_ERROR')
        })
        commit('setLoadingState', false)
        dispatch('nextMusic')
      }
    })
    .catch(err => {
      commit('setLoadingState', false)

      if (err.data === 'timeout') {
        dispatch('getMusic', {songIndex, callback})
      } else {
        // handle -> app api error
        handler.apiHandler(err)

        dispatch('networkErrorPopup', {
          err,
          callback: () => {
            dispatch('getMusic', {songIndex, callback})
          }
        })
      }
    })
}

export function addFavorite ({state, dispatch, commit}) {
  commit('setLoadingState', true)
  const trackId = state.selectTrack.id
  const url = `${BASE_URL}/user/me/tracks?track_id=${trackId}`

  Utils.ajax.post({
    url: url,
    dataType: 'json',
    timeout: TIME_OUT,
    data: {
      access_token: state.accessToken
    }
  })
    .then(res => {
      if (!res.data.data && res.data.error) {
        throw res.data
      }
      let list = state.myMusicList.slice()
      list.push({id: trackId})
      internetConnectionFailConut = 0
      commit('setMyMusicList', list)
      commit('setLoadingState', false)
    })
    .catch(err => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('addFavorite')
        }
      })
    })
}

export function deleteFavorite ({state, dispatch, commit}) {
  commit('setLoadingState', true)
  const trackId = state.selectTrack.id
  const url = `${BASE_URL}/user/me/tracks?track_id=${trackId}&access_token=${state.accessToken}`
  Utils.ajax.delete({
    url: url,
    dataType: 'json',
    timeout: TIME_OUT
  })
    .then(res => {
      if (!res.data.data && res.data.error) {
        console.log(res)
        throw res.data
      }
      let list = state.myMusicList.slice()
      list = list.filter(item => {
        return item.id !== trackId
      })
      internetConnectionFailConut = 0
      commit('setMyMusicList', list)
      commit('setLoadingState', false)
    })
    .catch(err => {
      commit('setLoadingState', false)

      // handle -> app api error
      handler.apiHandler(err)
      dispatch('networkErrorPopup', {
        err,
        callback: () => {
          dispatch('deleteFavorite')
        }
      })
    })
}

export function networkErrorPopup ({commit}, {err, callback}) {
  if (err.status === 0 && err.statusText === '' && err.data === 'error') {
    if (internetConnectionFailConut > 2) {
      Popup.showOneButtonPopup({
        title: i18n.t('POPUP_TITLE_NETWORK_ERROR_TRY_THREE_TIME'),
        content: i18n.t('POPUP_CONTENT_NETWORK_ERROR_TRY_THREE_TIME'),
        confirm () {
          internetConnectionFailConut = 0
          if (router.app.$route.path !== '/now-playing') {
            commit('setSelectTrackDefault')
          }
          // destroy app
          if (window.applicationFramework) {
            window.applicationFramework.applicationManager.getOwnerApplication(window.document).destroyApplication()
          }
        }
      })
    } else {
      Popup.showTwoButtonPopup({
        title: i18n.t('POPUP_TITLE_NO_NETWORK'),
        content: i18n.t('POPUP_CONTENT_NO_NETWORK'),
        confirm () {
          internetConnectionFailConut += 1
          callback()
        },
        cancel () {
          internetConnectionFailConut = 0
          if (router.app.$route.path !== '/now-playing') {
            commit('setSelectTrackDefault')
          }
        },
        confirmButtonName: i18n.t('POPUP_BUTTON_RETRY')
      })
    }
  } else {
    Popup.showOneButtonPopup({
      title: i18n.t('POPUP_TITLE_ERROR'),
      content: i18n.t('POPUP_CONTENT_UNEXPECTED_ERROR'),
      confirm () {
        internetConnectionFailConut = 0
        if (window.applicationFramework) {
          window.applicationFramework.applicationManager.getOwnerApplication(window.document).destroyApplication()
        }
      }
    })
  }
}

export function initDataFromLocalStorage ({commit}) {
  const wasPlayingTrack = JSON.parse(localStorage.getItem('deezer-music-current-track'))
  const wasPlayingMusicList = JSON.parse(localStorage.getItem('deezer-music-current-list'))
  const wasPlayingMusicMode = localStorage.getItem('deezer-music-mode')

  if (wasPlayingTrack && wasPlayingMusicList) {
    // set Previously selected track
    console.log('[localstorage] set previously track', wasPlayingTrack)
    commit('setSelectTrack', wasPlayingTrack)

    // set Previously selected track list
    console.log('[localstorage] set previously track list', wasPlayingMusicList)
    commit('setMusicList', wasPlayingMusicList)

    // set Previously selected track mode
    console.log('[localstorage] set previously track mode', wasPlayingMusicMode)
    commit('setPlayMode', wasPlayingMusicMode)
  }
}

function getSongIndex (musicList, id) {
  return musicList.findIndex((obj) => { return obj.id === id })
}

function divideType (id) {
  switch (id) {
    case 'mixes_popular':
      return 'top'
    case 'mixes_genre':
      return 'genres'
    case 'mixes_mood':
      return 'lists'
    case 'charts_tracks':
      return 'tracks'
    case 'charts_playlist':
      return 'playlists'
    case 'charts_albums':
      return 'albums'
    case 'charts_artists':
      return 'artists'
    case 'my_music_recently':
      return 'history'
    case 'my_music_favorite_tracks':
      return 'tracks'
    case 'my_music_favorite_playlist':
      return 'playlists'
    case 'my_music_favorite_albums':
      return 'albums'
    case 'my_music_favorite_artists':
      return 'artists'
    default:
      return id
  }
}
