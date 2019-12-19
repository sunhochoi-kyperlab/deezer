<template>
  <div id="p-list" class="contents">
    <div class="fix-item">
      <p>{{$route.params.categoryName || `Unknown Name`}}</p>
    </div>
    <div class="list st2" v-if="getArtistList.length > 0" ref="not-shuffle-artist-list">
      <ul>
        <obg-artist-list-item
          v-for="(artist, index) in getArtistList"
          :key="artist.artist"
          :artistName="artist.name"
          :coverImage="artist.picture"
          :artistId="artist.id"></obg-artist-list-item>
      </ul>
    </div>
    <div class="empty-items inner" v-else>
      <h2>There are no items</h2>
    </div>
  </div>
</template>
<script>
  import artistListItem from '../list-item/ListItemArtist.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      obgArtistListItem: artistListItem
    },

    data () {
      return {
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['not-shuffle-artist-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })

      this.setLoadingState(false)
    },

    computed: {
      ...mapGetters([
        'getArtistList'
      ])
    },

    methods: {
      ...mapMutations([
        'setLoadingState'
      ])
    }
  }
</script>
<style lang="scss" scoped>
  .empty-items {
    height: 520px !important;
    h2 {
      position: relative;
      top: 200px;
    }
  }

</style>
