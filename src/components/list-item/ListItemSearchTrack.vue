<template>
  <li
    :class="{
      dis: false,
      sel: false
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
    name: 'track-list-item-search',
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

      album: {
        type: Object,
        required: false
      },

      index: {
        type: Number,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'getSearchList',
        'getSelectedTrack'
      ])
    },

    methods: {
      ...mapMutations([
        'setPlayingState',
        'setSelectTrack',
        'setMusicList',
        'setPlayMode'
      ]),

      ...mapActions([
        'getMusic'
      ]),

      onClickList () {
        // input -> select track
        this.setSelectTrack(this.getSearchList[this.index])
        this.setMusicList([this.getSelectedTrack])
        this.setPlayMode('')
        this.getMusic({
          /*
            Why put songIndex at 0?
            If you select track added in search, only one track is inserted into musicList.
          */
          songIndex: 0,
          callback: () => {
            this.setPlayingState(true)
            this.$router.replace('now-playing')
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
