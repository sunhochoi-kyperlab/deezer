<template>
  <li
    :class="{
      dis: false,
      sel: false
    }"
    @click="onClickList()"
    :to="{
      name: 'shuffle-list-track'
    }">
    <div class="cover"><img :src="coverImage" alt=""></div>
    <h3>{{playListTitle}}</h3>
    <p class="sub-text">[{{trackNumber}}] tracks {{fanNumber === null ? '' : '- [' + fanNumber + '] fans'}}</p>
    <i></i>
  </li>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'play-list-item',
    props: {
      playListTitle: {
        type: String,
        required: true
      },

      playListId: {
        type: Number,
        required: true
      },

      trackNumber: {
        type: Number,
        required: true
      },

      fanNumber: {
        required: false
      },

      coverImage: {
        type: String,
        required: false
      }
    },

    methods: {
      ...mapActions([
        'getTracks'
      ]),

      onClickList () {
        this.getTracks({
          type: 'playlist',
          id: this.playListId,
          callback: () => {
            this.$router.push({
              name: 'shuffle-list-track',
              params: {
                categoryName: this.playListTitle
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
