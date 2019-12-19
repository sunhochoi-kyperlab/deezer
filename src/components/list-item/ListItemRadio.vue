<template>
  <li
    :class="{
      dis: false,
      sel: false
    }"
    @click="onClickList()">
    <div class="cover"><img :src="coverImage" alt=""></div>
    <h3>{{radioName}}</h3>
    <i></i>
  </li>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'artist-list-item',
    props: {
      radioName: {
        type: String,
        required: true
      },

      coverImage: {
        type: String,
        required: false
      },

      radioId: {
        type: Number,
        required: true
      },

      index: {
        type: Number,
        required: true
      }
    },

    computed: {
      ...mapGetters([
        'getMusicList'
      ])
    },

    methods: {
      ...mapMutations([
        'setSelectTrack',
        'setSongIndex'
      ]),

      ...mapActions([
        'getTrackFromRadio'
      ]),

      onClickList () {
        this.getTrackFromRadio({
          id: this.radioId,
          callback: () => {
            this.setSelectTrack(this.getMusicList[this.index])
            this.setSongIndex(this.index)
            this.$router.push({
              name: 'now-playing'
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
