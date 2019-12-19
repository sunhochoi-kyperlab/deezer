<template>
  <li
    :class="{
      dis: false
    }"
    @click="onClickList()">
    <div class="cover"><img :src="coverImage" alt=""></div>
    <h3>{{trackTitle}}</h3>
    <p class="sub-text">{{artistName}} - {{albumTitle}}</p>
  </li>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'track-list-item',
    props: {
      trackTitle: {
        type: String,
        required: true
      },

      artistName: {
        type: String,
        required: true
      },

      albumTitle: {
        type: String,
        required: true
      },

      coverImage: {
        type: String,
        required: false
      },

      index: {
        type: Number,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'getSelectedTrack',
        'getTrackList'
      ])
    },

    methods: {
      ...mapMutations([
        'setPlayMode',
        'setPlayingState',
        'setLoadingState',
        'setSelectTrack',
        'setMusicList'
      ]),

      ...mapActions([
        'getMusic'
      ]),

      checkPlayingTrack () {
        return this.trackTitle === this.getSelectedTrack.title
      },

      onClickList () {
        // input -> select track
        if (!this.checkPlayingTrack()) {
          this.setLoadingState(true)
          this.setSelectTrack(this.getTrackList[this.index])
          this.setMusicList(this.getTrackList)
          this.setPlayMode('')
          this.getMusic({
            songIndex: this.index,
            callback: () => {
              this.setPlayingState(true)
              this.$router.replace('now-playing')
            }
          })
        } else {
          this.$router.replace('now-playing')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
