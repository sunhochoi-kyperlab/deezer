<template>
  <div id="list-1" class="contents">
    <div class="list st2" ref="mix-list">
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
            id: 'mixes_popular',
            name: 'Popular Mixes'
          },
          {
            id: 'mixes_genre',
            name: 'Genre Mixes'
          },
          {
            id: 'mixes_mood',
            name: 'Mood Mixes'
          }
        ],
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['mix-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })
    }
  }
</script>
<style lang="scss" scoped>
</style>
