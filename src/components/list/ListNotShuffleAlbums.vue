<template>
  <div id="p-list" class="contents">
    <div class="fix-item">
      <p>{{$route.params.categoryName || `Unknown Name`}}</p>
    </div>
    <div class="list st2" v-if="getAlbumList.length > 0" ref="not-shuffle-album-list">
      <ul>
        <obg-album-list-item
          v-for="(album, index) in getAlbumList"
          :key="album.title"
          :album="album"></obg-album-list-item>
      </ul>
    </div>
    <div class="empty-items inner" v-else>
      <h2>There are no items</h2>
    </div>
  </div>
</template>
<script>
  import albumListItem from '../list-item/ListItemAlbum.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      obgAlbumListItem: albumListItem
    },

    data () {
      return {
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['not-shuffle-album-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })

      this.setLoadingState(false)
    },

    computed: {
      ...mapGetters([
        'getAlbumList'
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
