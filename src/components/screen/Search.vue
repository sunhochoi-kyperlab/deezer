<template>
  <div id="list-3" class="contents full">
    <div class="fix-item">
      <input type="text" placeholder="Search for an artist, track, playlist...." ref="search-input" @click="eventHandle()">
      <div class="close" @click="onClickCloseButton()"></div>
      <div class="search" @click="onClickSearchButton()"></div>
    </div>
    <div class="search-list-wrapper" ref="search-list" v-if="!noResult">
      <ul class="list st2 final">
        <obg-track-list-search-item
          v-for="(track, index) in searchList"
          :key="track.title"
          :trackTitle="track.title"
          :albumTitle="track.album.title"
          :artistName="track.artist.name"
          :coverImage="track.album.cover"
          :index="index"></obg-track-list-search-item>
      </ul>
    </div>
    <div class="empty-items-search" v-else>
      <h2>No Results Found</h2>
    </div>
  </div>
</template>
<script>
  import trackListItem from '../list-item/ListItemSearchTrack.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      obgTrackListSearchItem: trackListItem
    },

    data () {
      return {
        searchList: [],
        noResult: false,
        myScroll: null
      }
    },

    mounted () {
      this.$refs['search-input'].focus()
    },

    methods: {
      ...mapMutations([
        'setLoadingState'
      ]),

      ...mapActions([
        'searchMusic'
      ]),

      eventHandle () {
        this.$refs['search-input'].focus()
      },

//      eventTrigger (element, eventName) {
//        let event
//        if (window.CustomEvent) {
//          event = new CustomEvent(eventName)
//        } else {
//          event = document.createEvent('CustomEvent')
//          event.initCustomEvent(eventName, true, true)
//        }
//
//        element.dispatchEvent(event)
//      },

      onClickCloseButton () {
        this.$refs['search-input'].value = ''
      },

      onClickSearchButton () {
        this.setLoadingState(true)
        const content = this.$refs['search-input'].value
        this.searchMusic({
          type: 'track', // artist, album, track, label, dur_min:300, dur_max:300, bpm_min:120, bpm_max:200
          content: content,
          callback: (list) => {
            this.searchList = list
            if (list.length === 0) {
              this.noResult = true
            }
            this.$nextTick(() => {
              const $ele = this.$refs['search-list']
              if (this.myScroll === null) {
                this.myScroll = new MakeScroll($ele).scrollInstance
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../styles/color';
  $bgContent: url(../../styles/common/img/bg_content.png);
  $bg: url(../../styles/common/img/bg.png);

  .contents {
    &.full {
      width: 1154px;
      position: absolute;
      right: 0;
      background: #0b0d1f;
      display: block;
      z-index: 10;
    }
  }

  #list-3 {
    .fix-item {
        width:1123px;
        height: 99px;
        border-radius: 10px;
        background: #fff;
        margin: 15px 0 19px 17px;
      &::before{
          display: none;
      }  
      > input {
        font-size: 33px;
        line-height: 37px;
        color: #666;
        width: 900px;
        position: absolute;
        top: 32px;
        left: 28px;
      }
    }
    .search-list-wrapper {
      position: relative;
      overflow: hidden;
      height:520px !important;
      width: 100%;
      .list.final {
        position: static;
        height: auto !important;
        border-top: 1px solid #31345f;
      }
    }
  }

  .empty-items-search h2 {
    position: relative;
    top: 200px;
    text-align: center;
    font-size: 33px;
    line-height: 135%;
    color: #fff;
  }
</style>
