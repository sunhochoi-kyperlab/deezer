<template>
  <audio
    :autoplay="getIsPlaying"
    :loop="getRepeat === 2"
    ref="audio"
    :src="getSelectedTrackUrl"
    @durationchange="onUpdateDuration"
    @timeupdate="onUpdateTime"
    @progress="onProgress"
    @pause="onPause"
    @play="onPlay"
    @ended="onEnded"
    @canplay="onCanPlay"
    @error="onError"></audio>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { Popup } from '@/js/Popup'
  import i18n from '@/i18n/index'

  export default {
    name: 'obg-audio',

    data () {
      return {
        songURL: null,
        songIndex: null
      }
    },

    mounted () {
      const self = this
      this.songIndex = this.getSongIndex
      this.$root.$on('time:update', this.onTimeUpdate)

      this.$root.$on('music-play', () => {
        this.setPlayingState(true)
        this.$refs.audio.play()
          .catch((error) => {
            console.log(`[Audio Error] ${error}`)
            this.setPlayingState(false)
            this.showPopupNotPlayable()
          })
      })

      this.$root.$on('music-pause', () => {
        this.$refs.audio.pause()
        this.setPlayingState(false)
      })

//      this.$refs.audio.addEventListener('play', () => {
//      })

      // 다른 Audio를 사용하는 앱에서 재생이 된다면 멈춰야함
      this.$refs.audio.addEventListener('pause', () => {
        self.$refs.audio.pause()
        self.setPlayingState(false)
      })
    },

    updated: function () {
      if (this.songURL !== this.getSelectedTrackUrl) {
        this.songURL = this.getSelectedTrackUrl
        this.sec = 0
      }

      if (this.songIndex !== this.getSongIndex) {
        this.songIndex = this.getSongIndex
        if (this.$refs.audio.currentTime !== 0) {
          this.$refs.audio.currentTime = 0
        }
      }
    },

    computed: {
      ...mapGetters([
        'getIsPlaying',
        'getSelectedTrack',
        'getSongIndex',
        'getRepeat',
        'getSelectedTrackUrl',
        'getMusicList'
      ])
    },

    methods: {
      ...mapMutations([
        'setPlayingState',
        'setLoadingState'
      ]),

      ...mapActions([
        'updateCurrentTime',
        'updateDuration',
        'updateBuffered',
        'onAudioEnded',
        'nextMusic',
        'getFlows'
      ]),

      onPause () {
        console.log('onPause')
        if (this.$refs.audio.currentTime === this.$refs.audio.duration) {
          return
        }
        this.$emit('music-pause')
      },

      onPlay () {
        this.$emit('music-play')
        console.log('onPlay')
      },

      onUpdateTime () {
        if (!this.getIsPlaying) {
          return
        }
        let cTime = Math.round(this.$refs.audio.currentTime)
        if (Math.abs(cTime - this.sec) > 0) { // replay 때 update 되지 않는 문제 수정
          this.updateCurrentTime(cTime)
          this.sec = cTime
        }
      },

      onUpdateDuration () {
        console.log(Date.now() + ' : durationchage - ' + this.$refs.audio.duration)
        if (this.$refs.audio.duration === 0) {
          setTimeout(() => {
            this.updateDuration(this.$refs.audio.duration)
          }, 500)
        } else {
          this.updateDuration(this.$refs.audio.duration)
        }
      },

      onCanPlay () {
        console.log(Date.now() + ' : canplay')
        this.setLoadingState(false)
        console.log('buffered.length : ' + this.$refs.audio.buffered.length)
        if (this.$refs.audio.buffered.length === 1) {
          console.log('buffered : ' + this.$refs.audio.buffered.end(0))
          this.updateBuffered(this.$refs.audio.buffered.end(0))
        }
      },

      onEnded (e) {
        this.updateCurrentTime(this.$refs.audio.currentTime)
        this.onAudioEnded()
      },

      onError (e) {
        console.log(`Audio Error`)
        this.showPopupNotPlayable()
      },

      onTimeUpdate (val) {
        console.log('seek')
        const isPause = this.$refs.audio.paused

        if (!isPause) {
          const newCurrentTime = val
          this.$refs.audio.currentTime = newCurrentTime
          this.updateCurrentTime(newCurrentTime)
        } else {
          this.$refs.audio.currentTime = val
          this.updateCurrentTime(val)
        }
      },

      onProgress (e) {
        if (this.$refs.audio.buffered.length === 1) {
          this.updateBuffered(this.$refs.audio.buffered.end(0))
        }
      },

      showPopupNotPlayable () {
        this.setLoadingState(false)
        if (this.getMusicList.length > 1) {
          Popup.showNoticePopup({
            title: i18n.t('POPUP_TITLE_TRACK_ERROR'),
            content: i18n.t('POPUP_CONTENT_TRACK_ERROR')
          })
          this.nextMusic()
        } else {
          // 검색을 통하여 선택한 트랙이 재생 불가 할때
          const self = this

          Popup.showTwoButtonPopup({
            title: i18n.t('POPUP_TITLE_ERROR'),
            content: i18n.t('POPUP_CONTENT_ALL_TRACK_ERROR'),
            confirm () {
              self.setLoadingState(true)
              self.getFlows({
                callback: () => {
                  self.$router.replace('now-playing')
                }
              })
            },
            cancel () {
            },
            confirmButtonName: i18n.t('POPUP_BUTTON_TRY_FLOW')
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
