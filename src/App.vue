<template>
  <div id='app'>
    <obg-audio></obg-audio>
    <router-view></router-view>
    <div id="container" class="loading" v-show="$store.state.isLoading">
      <div class="pop loading">
        <div class="loader">
          <div class="spinner"></div>
          <p class="text">Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oauth from '@/js/oauth'
import audio from '@/components/audio/audio.vue'
export default {
  name: 'home',
  components: {
    obgAudio: audio
  },

  beforeDestroy () {
    oauth.close()
  }
}
</script>

<style lang="scss">
  @import "styles/common/css/layout.css";
  @import "styles/common/css/reset.css";
  @import "styles/streaming/css/streaming.css";
  @import "styles/color";
  #app {
    width: 1280px;
    height: 650px;
    .iScrollVerticalScrollbar.iScrollLoneScrollbar{
        width: 10px !important;
        .iScrollIndicator{
          border: none !important;
          background: #2f294c !important;
        }
    }
  }

  .contents {
    display: block;
  }
  .empty-items {
    float: left;
    width: 824px;
    height: 100%;
    // background-image: url('styles/common/img/bg_content.png');
    h2 {
      position: relative;
      top: 270px;
      text-align: center;
      font-size: 50px;
      line-height: 135%;
      color: $color_alabaster_approx;
    }
  }
  .inner {
    height: 520px;
    h2 {
      position: relative;
      top: 200px;
    }
  }

  .list {
    position: relative;
    overflow: hidden;
  }

  li {
    .cover {
      img {
        width: 100px;
        height: 100px;
      }
    }
    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

 .overlay{
	position: fixed;
	top: 0;
	left: 126px;
	width: calc(100% - 126px);
	height: 100%;
	background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  .popup{
    position: absolute;
    top: 117px;
    left: 50%;
    margin-left: -330px;
    width: 660px !important;
    height: 416px;
    color: #ffffff;
    text-align: center;
    background-color: #212347;
    overflow: hidden;
    border-radius: 15px;
    .title-inner{
      padding-top: 36px;
      margin: 0 auto;
      width: 90%;
      font-size: 33px;
      line-height: 37px;
      overflow: hidden;
    }
    .text{
      margin: 56px auto 0;
      width: 90%;
      height: 90px;
      font-size: 33px;
      line-height: 43px;
      overflow: hidden;
      white-space: pre;
    }
    .btn-area{
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 99px;
	  border-top: 1px solid #444673;
    //   &::before{
    //     position: absolute;
    //     top: -1px;
    //     left: 0;
    //     content: '';
    //     display: block;
    //     width: 100%;
    //     height: 1px;
    //     background-color: #616161;
    //   }
      button{
        width: 100%;
        height: 100%;
        float: left;
        text-align: center;
        color: #fff;
        font-size: 30px;
        line-height: 100px;
        &:active{
          background-color: #3a3d60;
          color: #ffffff;
        }
        & + button {
	        border-left: 1px solid #444673;
        }
      }
    }
  }
}

</style>
