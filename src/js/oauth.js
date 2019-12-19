import 'obigo-js-oauth-pscsp/oauth'
let oauthInstance = null

function singleton () {
  if (oauthInstance === null) {
    oauthInstance = new window.ObigoOauth()
  }
  return oauthInstance
}

export default singleton()
