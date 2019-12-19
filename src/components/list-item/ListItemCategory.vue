<template>
  <li @click="onClickList()">
    <h3>{{categoryName}}</h3>
    <i></i>
  </li>
</template>
<script>
  import { mapMutations, mapActions } from 'vuex'

  export default {
    name: 'categor-list-item',
    props: {
      listId: {
        type: String,
        required: true
      },

      categoryName: {
        type: String,
        required: true
      }
    },

    methods: {
      ...mapMutations([
        'setPlayMode',
        'setRepeat'
      ]),

      ...mapActions([
        'getCharts',
        'getRadioList',
        'getMyMusic'
      ]),

      onClickList () {
        const id = this.listId
        if (id === 'charts_tracks' || id === 'charts_playlist' || id === 'charts_albums' || id === 'charts_artists') {
          this.setPlayMode('')
          this.getCharts({
            type: id,
            callback: () => {
              this.$router.push({
                name: this.listId,
                params: {
                  categoryName: this.categoryName,
                  listId: this.listId
                }
              })
            }
          })
        } else if (id === 'mixes_popular' || id === 'mixes_genre' || id === 'mixes_mood') {
          this.setPlayMode('MIX')
          this.setRepeat(0)
          this.getRadioList({
            type: id,
            callback: () => {
              this.$router.push({
                name: this.listId,
                params: {
                  categoryName: this.categoryName
                }
              })
            }
          })
        } else if (id === 'my_music_recently' || id === 'my_music_favorite_playlist' || id === 'my_music_favorite_tracks' ||
          id === 'my_music_favorite_albums' || id === 'my_music_favorite_artists') {
          this.setPlayMode('')
          this.getMyMusic({
            type: id,
            callback: () => {
              this.$router.push({
                name: this.listId,
                params: {
                  categoryName: this.categoryName
                }
              })
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
