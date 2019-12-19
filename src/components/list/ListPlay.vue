<template>
  <div v-if="getMusicList.length > 0" id="playlist" class="contents">
    <div class="list st2" ref="play-list">
      <ul>
        <li
          v-for="(music, index) in getMusicList"
          :key="music.title"
          :class="{
            dis: false
          }"
          @click="onClickList(index, music.id)"
          ref="playTrackLi">
          <div class="cover"><img :src="music.album.cover" alt=""></div>
          <h3>{{music.title}}</h3>
          <p class="sub-text">{{music.artist.name}} - {{music.album.title}}</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="empty-items" v-else>
    <h2>There are no items</h2>
  </div>
</template>
<script>
  import trackListItem from '../list-item/ListItemTrack.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'play-list',
    components: {
      obgTrackListItem: trackListItem
    },

    data () {
      return {
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['play-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })

      this.setLoadingState(false)

      for (let i = 0; i < this.$refs.playTrackLi.length; i++) {
        if (this.$refs.playTrackLi[i].querySelector('h3').textContent === this.getSelectedTrack.title) {
          this.$refs.playTrackLi[i].classList.add('sel')
          return
        }
      }
    },

    computed: {
      ...mapGetters([
        'getSelectedTrack',
        'getMusicList'
      ])
    },

    methods: {
      ...mapMutations([
        'setLoadingState',
        'setSelectTrack',
        'setPlayingState',
        'setSongIndex'
      ]),

      ...mapActions([
        'getMusic'
      ]),

      checkPlayingTrack (id) {
        return id === this.getSelectedTrack.id
      },

      onClickList (index, id) {
        // input -> select track
        if (!this.checkPlayingTrack(id)) {
          this.setLoadingState(true)
          this.setSelectTrack(this.getMusicList[index])
          this.setSongIndex(index)
          this.getMusic({
            songIndex: index,
            callback: () => {
              this.setPlayingState(true)
              this.$router.replace('now-playing')
            }
          })
        } else {
          this.$router.replace('now-playing')
        }
      }
    },

    watch: {
      getSelectedTrack () {
        for (let i = 0; i < this.$refs.playTrackLi.length; i++) {
          this.$refs.playTrackLi[i].classList.remove('sel')
          if (this.$refs.playTrackLi[i].querySelector('h3').textContent === this.getSelectedTrack.title) {
            this.$refs.playTrackLi[i].classList.add('sel')
            return
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
