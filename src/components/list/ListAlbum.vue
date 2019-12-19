<template>
  <div v-if="getAlbumList.length > 0" id="albumlist" class="contents">
    <div class="list st2" ref="album-list">
      <ul>
        <obg-album-list-item
          v-for="(album, index) in getAlbumList"
          :key="album.title"
          :album="album"></obg-album-list-item>
      </ul>
    </div>
  </div>
  <div class="empty-items" v-else>
    <h2>There are no items</h2>
  </div>
</template>
<script>
  import albumListItem from '../list-item/ListItemAlbum.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'album-list',
    components: {
      obgAlbumListItem: albumListItem
    },

    data () {
      return {
        albumList: this.getAlbumList,
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['album-list']
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
<style lang="scss">
  @import "../../styles/color";

  .empty-items {
    float: left;
    width: 824px;
    height: 100%;
    h2 {
      position: relative;
      top: 270px;
      text-align: center;
      font-size: 50px;
      line-height: 135%;
      color: $color_alabaster_approx;
    }
  }

</style>
