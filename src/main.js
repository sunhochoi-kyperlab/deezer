import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
/* eslint-disable */
import ObigoUI from 'obigo-js-ui'

Vue.use(ObigoUI)
Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err)
  console.log(vm)
  console.log(info)
}

/* Native Title */
let app
if (window.applicationFramework && window.applicationFramework.applicationManager) {
  app = window.applicationFramework.applicationManager.getOwnerApplication(window.document)
}

if (app) {
  app.addEventListener('ApplicationShown', function () {
    let a = window.applicationFramework.applicationManager.getOwnerApplication(window.document)
    let d = a.getDescriptor()
    if (a && d) {
      if (d.localURI && d.iconSrcPath) {
        a.setStatusBarTitle(d.getWidgetName('en-us'), (d.localURI + d.iconSrcPath))
      }
    }
  })
}
/* Native Title - End */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = window.applicationFramework.applicationManager.getOwnerApplication(window.document).getDescriptor().localURI + '../resources/vk-csp/vk.css'
    document.head.appendChild(link)

    // load js
    const js = document.createElement('script')
    js.setAttribute('type', 'text/javascript')
    js.setAttribute('src', window.applicationFramework.applicationManager.getOwnerApplication(window.document).getDescriptor().localURI + '../resources/vk-csp/vk.js')
    document.head.appendChild(js)

    js.addEventListener('load', () => {
      try {
        this.vk = new window.VirtualKeypad()
        window.applicationFramework.applicationManager.getOwnerApplication(window.document).addEventListener('ApplicationKeypad', (type, str, source) => {
          let option = {
            keyType: type,
            text: str
          }
          this.vk.open(option)
        }, false)
      } catch (err) {
        console.log(err.message)
      }
    })
  }
})
