<template>
  <div id="tracklist" class="contents">
    <div class="fix-item">
      <p>{{$route.params.categoryName || `Unknown Name`}}</p>
      <div
        class="shuffle"
        :class="{
          dis: this.getTrackList.length === 0
        }"
        @click="onClickShuffleButton()">SHUFFLE PLAY</div>
    </div>
    <div v-if="getTrackList.length > 0" class="list st2" ref="shuffle-track-list">
      <ul>
        <obg-track-list-item
          v-for="(track, index) in getTrackList"
          :key="track.title"
          :trackTitle="track.title"
          :albumTitle="$route.params.categoryName"
          :artistName="track.artist.name"
          :coverImage="track.album.cover"
          :index="index"
          ref="trackLi"></obg-track-list-item>
      </ul>
    </div>
    <div class="empty-items inner" v-else>
      <h2>There are no items</h2>
    </div>
  </div>

</template>
<script>
  import trackListItem from '../list-item/ListItemTrack.vue'
  import playListItem from '../list-item/ListItemPlay.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      obgTrackListItem: trackListItem,
      obgPlayListItem: playListItem
    },

    data () {
      return {
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['shuffle-track-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })

      this.setLoadingState(false)

      for (let i = 0; i < this.$refs.trackLi.length; i++) {
        if (this.$refs.trackLi[i].$options.propsData.trackTitle === this.getSelectedTrack.title) {
          this.$refs.trackLi[i].$el.classList.add('sel')
          return
        }
      }
    },

    computed: {
      ...mapGetters([
        'getTrackList',
        'getSelectedTrack'
      ])
    },

    methods: {
      ...mapMutations([
        'setLoadingState',
        'setShuffleState'
      ]),

      onClickShuffleButton () {
        if (this.getTrackList.length > 0) {
          const randomIndex = Math.floor(Math.random() * (this.getTrackList.length))
          this.setShuffleState(true)
          this.$refs.trackLi[randomIndex].onClickList()
        }
      }
    },

    watch: {
      getSelectedTrack () {
        for (let i = 0; i < this.$refs.trackLi.length; i++) {
          this.$refs.trackLi[i].$el.classList.remove('sel')
          if (this.$refs.trackLi[i].$options.propsData.trackTitle === this.getSelectedTrack.title) {
            this.$refs.trackLi[i].$el.classList.add('sel')
            return
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dis {
    pointer-events: none;
  }
</style>
