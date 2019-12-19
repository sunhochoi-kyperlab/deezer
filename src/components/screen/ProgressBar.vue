<template>
  <div class="progress">
    <obg-play-time
      v-model="currentTimeValue"
      :max="duration"
      :sliderWidth="724"
      :barHeight="8"
      :disabled="false"
      :buffer="buffer"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @input="onInput"
      ></obg-play-time>
  </div>
</template>
<script type="text/babel">
  import playTime from 'obigo-js-ui/components/playtime'
  import slider from 'obigo-js-ui/components/slider'
  /**
   * @class playtime
   * @classdesc components/playtime
   * @param {number} [min=0]
   * @param {number} [max=100]
   * @param {number} [step=1]
   * @param {number} [value=0]
   * @param {number} [barHeight=5]
   * @param {number} [sliderWidth=500]
   * @param {number} [playtimeWidth=500]
   * @param {boolean} [draggable=true]
   * @param {boolean} [disabled=false]
   *
   * @example
   * <obg-playtime
   *  v-model="model"
   *  :min="0"
   *  :max="100" @input="onInput"
   *  ></obg-playtime>
   */

  export default {
    name: 'obg-playtime',
    components: {
      obgPlayTime: playTime,
      obgSlider: slider
    },

    props: {
      currentTime: {
        type: Number,
        default: 0
      },

      maxTime: {
        type: Number,
        default: 0
      },

      buffer: {
        type: Number,
        default: 0
      },

      duration: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        currentTimeValue: this.currentTime
      }
    },

    watch: {
      currentTime (val) {
        this.currentTimeValue = val
      }
    },

    methods: {
      onDragStart (e) {
        this.dragging = true
      },

      onDragEnd (e) {
        this.$root.$emit('time:update', this.currentTimeValue)
        this.dragging = false
      },

      onInput (val) {
        if (!this.dragging) {
          this.$root.$emit('time:update', val)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../styles/color';

  .obg-slider {
    width: 734px !important;
    margin: 0 auto;
    .obg-slider-content {
      position: relative;
      flex: 1;
      height: 3px;
      > div {
        height: 3px !important;
      }
      .obg-slider-runway {
        position: absolute;
        top: 0;
        left: 0;
        border-top: 0 !important;
        background-color: #2c2d3c;
        width: 100%;
      }
      .obg-slider-progress {
        position: absolute;
        top: 0px;
        background-color: #fff;
        &:before {
          background: none !important;
        }
      }
      .obg-slider-buffer {
        position: absolute;
        top: 0;
        background-color: rgba(255, 255, 255, 0.1);
      }
      .obg-slider-thumb {
        position: absolute;
        top: 0;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        &:before {
          content: '';
          position: absolute;
          top: -14px;
          left: 10px;
          display: block;
          width: 30px;
          height: 30px;
          //Instead of the line below you could use @include border-radius($radius, $vertical-radius)
          border-radius: 100%;
          background-color: #fff;
        }
        &:active:before {
          background-color: $color_dodger_blue_50_approx;
        }
      }
    }
  }
.obg-playtime{
    width: 100% !important;
}
  .obg-playtime-label {
    width: 100px !important;
    position: absolute !important;
    left: 46px !important;
    top: 49px;
    font-size: 24px !important;
    color: #fff !important;
  }
  .end {
    left: 679px !important;
    text-align: right;
  }

  .progress {
    z-index: 1;
    position: relative;
    padding-top: 14px;
    width: 100%;
    height: 16px;
  }
  .controls{
    margin-top: 85px;
    .repeat{
        margin-left: 36px;
        background-image: url('../styles/common/img/btn_player.png') !important;
        background-position: 0 -320px;
        &:active{
            background-position: -80px -320px;
        }
        &.sel{
            background-position: -160px -320px;
        }
        &.dis{
            background-position: -240px -320px;
        }
    }
    .forward{
        margin-left: 127px; 
    }
    .play{
        margin: 0 50px;
    }
    .pause{
        margin: 0 50px;
    }
    .random{
        margin-left: 127px;
        background-image: url('../styles/common/img/btn_player.png') !important;
        background-position: 0 -400px;
        &:active{
            background-position: -80px -400px;
        }
        &.sel{
            background-position: -160px -400px;
        }
        &.dis{
            background-position: -240px -400px;
        }
    }
  }
</style>
