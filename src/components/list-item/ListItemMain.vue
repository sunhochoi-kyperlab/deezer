<template>
  <li
    :id="`id_${idx}`"
    :data-feature-id="featureId"
    :class="{
      sel: isActive,
      dis: !getIsLoggedin
    }"
    @click="onClickList(featureId)">
    <p>{{listName}}</p>
  </li>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'list-item',
    props: {
      idx: {
        type: Number,
        required: true
      },

      listName: {
        type: String,
        required: true
      },

      featureId: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        isActive: false
      }
    },

    computed: {
      ...mapGetters([
        'getIsLoggedin'
      ])
    },

    methods: {
      ...mapMutations([
        'setPlayMode',
        'setRepeat'
      ]),

      ...mapActions([
        'getEditional',
        'getFlows'
      ]),

      selectListElement (id) {
        this.$parent.$children.forEach((element, index) => {
          element.isActive = element.$el.id === id
        })
      },

      onClickList (featureId) {
        this.selectListElement(this.$el.id)

        this.$parent.$emit('li:active')
        this.$parent.$data.myScroll.scrollToElement(`[data-feature-id="${featureId}"]`, null, null, true)
        this.routePage(featureId)
      },

      routePage (featureId) {
        switch (featureId) {
          case 'editors-pick':
            this.getEditional({
              type: 'selection',
              callback: () => {
                this.$router.replace({
                  name: featureId
                })
              }
            })
            break

          case 'new-release':
            this.getEditional({
              type: 'releases',
              callback: () => {
                this.$router.replace({
                  name: featureId
                })
              }
            })
            break

          case 'flows':
            this.getFlows({
              callback: () => {
                this.setPlayMode('FLOW')
                this.setRepeat(0)
                this.$router.replace({
                  name: featureId
                })
              }
            })
            break

          case 'search':
            this.$router.push({
              name: featureId
            })
            break
          default:
            this.$router.replace({
              name: featureId
            })
            break
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
