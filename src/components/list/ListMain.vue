<template>
  <div
    class="left-mn">
    <div
      class="fix-item"
      :class="{
        dis: !getIsLoggedin
      }"
      @click="onClickPlaying()">
      <p
        class="playing"
        :class="{
          sel: getIsLoggedin && isActive,
        }">
        Now Playing
        <i></i>
      </p>
    </div>
    <div id="wrapper" class="menu">
      <ul class="menu_li">
        <obg-list-item
          v-for="(feature, index) in features"
          :key="feature.name"
          :list-name="feature.name"
          :idx="index"
          :feature-id="feature.id"
          ref="child"></obg-list-item>
        <li
          v-if="getIsLoggedin"
          :id="`id_8`"
          @click="logoutOauth">
          <p>Logout</p>
        <li
          v-else
          :id="`id_8`"
          @click="loginOauth">
          <p>Login</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import listItem from '../list-item/ListItemMain.vue'
  import oauth from '@/js/oauth'
  import MakeScroll from '@/js/makeScroll'
  import ErrorType from '@/js/errorType'
  import handler from '@/js/errorHandler'
  import i18n from '@/i18n/index'
  import { Popup } from '@/js/Popup'
  import { mapMutations, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'obg-list',
    components: {
      obgListItem: listItem
    },

    data () {
      return {
        isActive: false,
        myScroll: null,
        features: [
          {
            id: 'play-list',
            name: 'Playlist'
          },
          {
            id: 'flows',
            name: 'Flows'
          },
          {
            id: 'editors-pick',
            name: 'Editor’s Pick'
          },
          {
            id: 'charts',
            name: 'Charts'
          },
          {
            id: 'new-release',
            name: 'New Release'
          },
          {
            id: 'mixes',
            name: 'Mixes'
          },
          {
            id: 'my-music',
            name: 'My music'
          },
          {
            id: 'search',
            name: 'Search'
          }
        ]
      }
    },

    mounted () {
      this.$on('li:active', () => {
        this.isActive = false
      })

      this.$on('setPlayingPosition', this.selectNowPlaying)
      this.$nextTick(() => {
        const $ele = this.$el.querySelector('#wrapper')
        this.myScroll = new MakeScroll($ele).scrollInstance
      })
    },

    computed: {
      ...mapGetters([
        'getIsLoggedin',
        'getIsPlaying'
      ])
    },

    methods: {
      ...mapMutations([
        'setLoggedinState',
        'setAccessToken',
        'InitializeData',
        'setLoadingState'
      ]),

      ...mapActions([
        'networkErrorPopup'
      ]),

      loginOauth () {
        this.setLoadingState(true)
        const self = this
        let opt = {
          type: 0, // (0: deezer, 1:facebook, 2: google, 3: twitter)
          successCallback: () => {
            this.setLoadingState(false)
            self.setLoggedinState(oauth.isLoggedin())
            self.setAccessToken(oauth.getProperty(oauth.property.OAUTH_PROPERTY_ACCESS_TOKEN))
            self.$router.replace({
              name: 'now-playing'
            })
          },
          errorCallback: errorCode => {
            this.setLoadingState(false)
            handler.oauthHandler(errorCode)
            if (errorCode === ErrorType.OAUTH.OAUTH_ERROR_GENERIC.code) {
              const errorObject = {
                data: 'error',
                status: 0,
                statusText: ''
              }
              self.networkErrorPopup({
                err: errorObject,
                callback: () => {
                  self.loginOauth()
                }
              })
            }
          }
        }
        oauth.open(opt)
      },

      logoutOauth () {
        const self = this
        Popup.showTwoButtonPopup({
          title: i18n.t('POPUP_TITLE_LOGOUT'),
          content: i18n.t('POPUP_CONTENT_LOGOUT'),
          confirm: () => {
            oauth.logout()
            // set islogin state in store
            this.$root.$emit('music-pause')
            self.InitializeData()
            console.log('ListMain -> logout', oauth.isLoggedin())
            self.$router.push({
              name: 'need_login'
            })
          },
          cancel () {
          }
        })
      },

      selectNowPlaying () {
        this.isActive = true
        this.$children.forEach(element => {
          element.isActive = false
        })
      },

      onClickPlaying () {
        this.selectNowPlaying()
        this.$router.push({
          name: 'now-playing'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../styles/color';

  .menu {
    // overflow: hidden;
    // position: absolute;
    height: 533px;
    .menu_li {
      height: auto;
    }
  }

  .fix-item {
    p {
      line-height: 130px;
    }
  }

  .dis {
    p {
      color: $color_fuscous_gray_approx;
    }
    pointer-events: none;
  }
</style>
