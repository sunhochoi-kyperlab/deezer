<template>
  <li
    :class="{
      dis: false,
      sel: false
    }"
    @click="onClickList()"  >
    <div class="cover"><img :src="coverImage" alt=""></div>
    <h3>{{artistName}}</h3>
    <i></i>
  </li>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'artist-list-item',
    props: {
      artistName: {
        type: String,
        required: true
      },

      coverImage: {
        type: String,
        required: false
      },

      artistId: {
        type: Number,
        required: true
      }
    },

    methods: {
      ...mapActions([
        'getTracks'
      ]),

      onClickList () {
        this.getTracks({
          type: 'artist',
          id: this.artistId,
          callback: () => {
            this.$router.push({
              name: 'shuffle-list-track',
              params: {
                categoryName: this.artistName,
                coverImage: this.coverImage
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
