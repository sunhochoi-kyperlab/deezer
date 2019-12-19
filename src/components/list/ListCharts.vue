<template>
  <div id="list-1" class="contents">
    <div class="list st2" ref="chart-list">
      <ul>
        <obg-category-list-item
          v-for="obj in list"
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
            id: 'charts_tracks',
            name: 'Popular Tracks'
          },
          {
            id: 'charts_playlist',
            name: 'Popular Playlist'
          },
          {
            id: 'charts_albums',
            name: 'Popular Albums'
          },
          {
            id: 'charts_artists',
            name: 'Popular Artists'
          }
        ],
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['chart-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })
    }
  }
</script>
<style lang="scss" scoped>
</style>
