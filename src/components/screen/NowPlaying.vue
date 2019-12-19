<template>
  <div
    v-if="getMusicList.length > 0"
    id="player"
    class="contents"><!--div id="player" class="contents no-cover"-->
    <img :src="getSelectedTrack.album.cover_medium || defaultCover"/>
    <div class="add-feature">
      <span
        class="favorite"
        :class="{
          full: isFavorite
        }"
        @click="toggleFavorite()"></span><!--span class="favorite full"></span-->
      <span class="mode">{{getMode}}</span>
    </div>
    <div class="song-info">
      <h2 class="title">{{getSelectedTrack.title || `Unknown Title`}}</h2>
      <p class="sub-info">{{getSelectedTrack.artist.name || `Unknown Artist`}}</p>
    </div>

    <obg-progress-bar
      :currentTime="$store.state.audio.currentTime"
      :maxTime="$store.state.audio.duration"
      :buffer="$store.state.audio.buffered"
      :duration="$store.state.audio.duration"></obg-progress-bar>

    <div class="controls">
      <button
        class="repeat"
        :class="{
          dis: getMode === 'FLOW' || getMode === 'MIX',
          sel: getRepeat === 1,
          'one sel': getRepeat === 2
        }"
        @click="clickRepeat()"></button>
      <button
        class="forward"
        :class="{
          dis: getMode === 'FLOW' || getMode === 'MIX'
        }"
        @click="onClickPrevMusic()"></button>
      <button
        v-if="!getIsPlaying"
        class="play"
        key="music-play"
        @click="onClickPlayButton()"></button>
      <button
        v-else
        class="pause"
        key="music-play"
        @click="onClickPauseButton()"></button>
      <button
        class="backward"
        @click="onClickNextMusic()"></button>
      <button
        class="random"
        :class="{
          dis: getMode === 'FLOW' || getMode === 'MIX',
          sel: getIsShuffle
        }"
        @click="onClickShuffle"></button>
    </div>
  </div>
  <div v-else id="empty" class="contents">
    <div class="add-feature">
      <span class="mode">FLOW</span>
    </div>
    <div class="song-info">
      <h2 class="title">NO MUSIC YET?<br>TRY FLOW</h2>
      <p class="sub-info">a mix inspired by your favorites</p>
    </div>
    <div class="controls">
      <button class="play" @click="onClickButton()"></button>
    </div>
  </div>
</template>
<script>
  import progressBar from './ProgressBar.vue'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'music-player',
    components: {
      obgProgressBar: progressBar
    },

    props: {
      trackTitle: {
        type: String,
        required: false
      },

      artistName: {
        type: String,
        required: false
      }
    },

    mounted () {
//      if (this.getSelectedTrack.url !== null) {
//        this.$root.$emit('music-play')
//      }
      this.$parent.$children[0].$emit('setPlayingPosition')
    },

    data () {
      return {
        isPlaying: false,
        value: this.$store.state.audio.currentTime,
        changedValue: 0,
        dragging: false,
        defaultCover: require(`@/styles/streaming/img/bg_cover_default.png`)
      }
    },

    computed: {
      ...mapGetters([
        'getIsPlaying',
        'getRepeat',
        'getMode',
        'getAudioInfo',
        'getSelectedTrack',
        'getMyMusicList',
        'getIsShuffle',
        'getMusicList'
      ]),

      currentTime () {
        return (this.dragging) ? this.value : this.$store.state.audio.currentTime
      },

      isFavorite () {
        const myTracks = this.getMyMusicList.slice()
        const selectedSongId = this.getSelectedTrack.id
        const result = myTracks.filter(item => {
          return item.id === selectedSongId
        })
        return result.length
      }
    },

    watch: {
      currentTime (val) {
        this.value = val
      },

      getSelectedTrack () {
        this.$parent.$children[0].$emit('setPlayingPosition')
      }
    },

    methods: {
      ...mapMutations([
        'setRepeat',
        'setPlayingState',
        'setPlayMode',
        'setShuffleState'
      ]),

      ...mapActions([
        'deleteFavorite',
        'addFavorite',
        'getFlows',
        'nextRandomMusic',
        'nextMusic',
        'prevMusic'
      ]),

      onDragStart (e) {
        console.log('drag start', e)
        this.dragging = true
      },

      onDragEnd (e) {
        console.log('drag end', e)
        this.$root.$emit('time:update', this.value)
        this.dragging = false
      },

      onInput (val) {
        this.value = val
        if (!this.dragging) {
          this.$root.$emit('time:update', this.value)
        }
      },

      onClickPlayButton () {
        if (!this.getIsPlaying) {
          this.$root.$emit('music-play')
        }
      },

      onClickPauseButton () {
        if (this.getIsPlaying) {
          this.$root.$emit('music-pause')
        }
      },

      toggleFavorite () {
        if (this.isFavorite) {
          console.log('delete favorite')
          this.deleteFavorite()
        } else {
          console.log('add favorite')
          this.addFavorite()
        }
      },

      clickRepeat () {
        let num = this.getRepeat
        this.setRepeat((num === 2) ? 0 : num += 1)
      },

      onClickButton () {
        this.getFlows({
          callback: () => {
            this.setPlayingState(true)
            this.setPlayMode('FLOW')
            this.setRepeat(0)
            this.$router.push({
              name: 'now-playing'
            })
          }
        })
      },

      onClickNextMusic () {
        this.$parent.$parent.$children[0].$refs.audio.src = null
        if (this.getIsShuffle) {
          this.nextRandomMusic()
        } else {
          this.nextMusic()
        }
      },

      onClickPrevMusic () {
        this.$parent.$parent.$children[0].$refs.audio.src = null
        if (this.getIsShuffle) {
          this.nextRandomMusic()
        } else {
          this.prevMusic()
        }
      },

      onClickShuffle () {
        this.setShuffleState(!this.getIsShuffle)
      }
    }
  }
</script>
<style lang="scss" scoped>
  #player {
    position: relative;
    > img {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0.1;
      width: 824px;
      height: 650px;
    }
    &:before {
      content: '';
    }
    .favorite{
        left: 46px;
        top:42px;
        width: 44px;
        height:39px;
        background-image: url('../styles/common/img/favorite.png');
        background-position: 0 0;
        &:active, &.full{
            background-position: -44px 0;
        }
    }
    .mode{
        right: 46px;
        color: #fff;
        font-family:'NotoSansCJKkr-Medium';
    }   
    .add-feature{
        height: 185px;
    }
    .song-info {
        height: 212px;
        h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 98%;
        font-family:'NotoSansCJKkr-Medium';
        }
    }
  }
  
  #empty.contents{
      width: 1154px;
  }

  .repeat {
    &.dis {
      pointer-events: none;
    }
  }

  .random {
    &.dis {
      pointer-events: none;
    }
  }
</style>
