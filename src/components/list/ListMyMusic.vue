<template>
  <div id="list-1" class="contents">
    <div class="list st2" ref="my-music-list">
      <ul>
        <obg-category-list-item
          v-for="(obj, index) in list"
          :key="obj.id"
          :listId="obj.id"
          :categoryName="obj.name"></obg-category-list-item>
      </ul>
    </div>
  </div>
</template>
<script>
  import categoryListItem from '../list-item/ListItemCategory.vue'
  import MakeScroll from '@/js/makeScroll'

  export default {
    name: 'category-list',
    components: {
      obgCategoryListItem: categoryListItem
    },

    data () {
      return {
        list: [
          {
            id: 'my_music_recently',
            name: 'Recently Played'
          },
          {
            id: 'my_music_favorite_tracks',
            name: 'Favorite Tracks'
          },
          {
            id: 'my_music_favorite_playlist',
            name: 'Favorite Playlist'
          },
          {
            id: 'my_music_favorite_albums',
            name: 'Favorite Albums'
          },
          {
            id: 'my_music_favorite_artists',
            name: 'Favorite Artists'
          }
        ],
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['my-music-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })
    }
  }
</script>
<style lang="scss" scoped>
</style>
