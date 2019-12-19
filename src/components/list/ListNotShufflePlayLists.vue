<template>
  <div id="p-list" class="contents">
    <div class="fix-item">
      <p>{{$route.params.categoryName || `Unknown Name`}}</p>
    </div>
    <div v-if="getPlayLists.length > 0" class="list st2" ref="not-shuffle-playlist">
      <ul>
        <obg-play-list-item
          v-for="(playList, index) in getPlayLists"
          :key="playList.title"
          :playListId="playList.id"
          :playListTitle="playList.title"
          :trackNumber="playList.nb_tracks"
          :fanNumber="getFans(playList)"
          :coverImage="playList.picture"></obg-play-list-item>
      </ul>
    </div>
    <div class="empty-items inner" v-else>
      <h2>There are no items</h2>
    </div>
  </div>
</template>
<script>
  import playListItem from '../list-item/ListItemPlay.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      obgPlayListItem: playListItem
    },

    data () {
      return {
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['not-shuffle-playlist']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })

      this.setLoadingState(false)
    },

    computed: {
      ...mapGetters([
        'getPlayLists'
      ])
    },

    methods: {
      ...mapMutations([
        'setLoadingState'
      ]),

      getFans (playList) {
        if (playList.fans === 0) {
          return playList.fans
        } else {
          return playList.fans || null
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
