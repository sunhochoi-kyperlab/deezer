<template>
  <li
    :class="{
      dis: isDisabled
    }"
    @click="onClickList()">
    <div class="cover"><img :src="album.cover" alt=""></div>
    <h3>{{album.title}}</h3>
    <p class="sub-text">{{album.artist.name}}</p>
    <i></i>
  </li>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isDisabled: false
    }
  },

  methods: {
    ...mapMutations([
      'setSelectAlbum'
    ]),

    ...mapActions([
      'getTracks'
    ]),

    onClickList () {
      this.setSelectAlbum(this.album)
      this.getTracks({
        type: 'album',
        id: this.album.id,
        callback: () => {
          this.$router.push({
            name: 'shuffle-list-track',
            params: {
              categoryName: this.album.title,
              coverImage: this.album.cover,
              album: this.album,
              mode: 'album'
            }
          })
        },
        album: this.album
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
