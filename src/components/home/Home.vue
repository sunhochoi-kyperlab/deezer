<template>
  <div id="container" class="player">
    <div class="gnb">
      <ul class="gnb_li">
        <li class="back" @click="onBack"></li>
        <li class="home" @click="onHome"></li>
      </ul>
    </div>
    <obg-list></obg-list>
    <router-view></router-view>
  </div>
</template>
<script>
  import obgList from '@/components/list/ListMain.vue'
  import oauth from '@/js/oauth'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    name: 'root',
    components: {
      obgList: obgList
    },

    data () {
      return {
        currentLoggedinState: false,
        internetConnectionFailConut: 0,
        hardkeyCodes: this.$hardkey.getCodes()
      }
    },

    created () {
      this.setLoggedinState(oauth.isLoggedin())
      this.setAccessToken(oauth.getProperty(oauth.property.OAUTH_PROPERTY_ACCESS_TOKEN))
      this.attemptConnection()
    },

    mounted () {
      this.initHardKeyAction()

      if (!oauth.isLoggedin()) {
        this.$router.replace('need_login')
      } else {
        this.$router.replace('now-playing')
      }
    },

    methods: {
      ...mapMutations([
        'setLoggedinState',
        'setAccessToken',
        'setSelectTrack',
        'setMusicList',
        'popPageHistoryStack'
      ]),

      ...mapActions([
        'getMyMusicForInit'
      ]),

      attemptConnection () {
        if (oauth.isLoggedin()) {
          return this.getMyMusicForInit()
        }
      },

      onDestroyApp (evt) {
        if (window.applicationFramework) {
          window.applicationFramework.applicationManager.getOwnerApplication(window.document).destroyApplication()
        }
      },

      onBack (evt) {
        if (['/now-playing', '/play-list', '/flows', '/editors-pick', '/charts', '/new-release', '/mixes', '/my-music', '/need_login'].indexOf(this.$route.path) >= 0) {
          if (window.applicationFramework) {
            window.applicationFramework.applicationManager.getOwnerApplication(window.document).back()
          }
        } else if (this.$route.path === '/search') {
          this.$router.replace('/now-playing')
        } else {
          this.$router.back()
        }
      },

      onHome () {
        if (window.applicationFramework) {
          window.applicationFramework.applicationManager.getOwnerApplication(window.document).home()
        }
      },

      initHardKeyAction () {
        this.$hardkey.addHardkeyListener(this.hardkeyCodes.code.HARDKEY_BUTTON_BACK, (e) => {
          this.onBack()
        })
      }
    }
  }
</script>
<style lang="scss">
</style>
