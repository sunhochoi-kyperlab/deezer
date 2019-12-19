<template>
  <div id="list-2" class="contents">
    <div class="fix-item">
      <p>{{$route.params.categoryName || `Unknown Name`}}</p>
    </div>
    <div v-if="getMixesList.length > 0" class="list st2" ref="not-shuffle-radio-list">
      <ul>
        <obg-radio-list-item
          v-for="(radio, index) in getMixesList"
          :key="radio.name"
          :radioName="radio.title"
          :coverImage="radio.picture"
          :radioId="radio.id"
          :index="index"></obg-radio-list-item>
      </ul>
    </div>
    <div class="empty-items inner" v-else>
      <h2>There are no items</h2>
    </div>
  </div>
</template>
<script>
  import radioListItem from '../list-item/ListItemRadio.vue'
  import MakeScroll from '@/js/makeScroll'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {
      obgRadioListItem: radioListItem
    },

    data () {
      return {
        myScroll: null
      }
    },

    mounted () {
      this.$nextTick(() => {
        const $ele = this.$refs['not-shuffle-radio-list']
        this.myScroll = new MakeScroll($ele).scrollInstance
      })

      this.setLoadingState(false)
    },

    computed: {
      ...mapGetters([
        'getMixesList'
      ])
    },

    methods: {
      ...mapMutations([
        'setLoadingState'
      ])
    }
  }
</script>
<style lang="scss" scoped>
</style>
