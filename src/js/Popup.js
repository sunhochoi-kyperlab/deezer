import popup from 'obigo-js-ui/components/popup'

export class Popup {
  static showOneButtonPopup (args) {
    const { title, content, confirm } = args
    const _oneButton = popup.show({
      title,
      content,
      buttons: [
        {
          label: 'OK',
          onClick () {
            confirm()
            _oneButton.close()
          }
        }
      ]
    })
  }

  static showTwoButtonPopup (args) {
    const { title, content, confirm, cancel, confirmButtonName = 'OK' } = args
    const _twoButton = popup.show({
      title,
      content,
      buttons: [
        {
          label: confirmButtonName,
          onClick () {
            confirm()
            _twoButton.close()
          }
        },
        {
          label: 'Cancel',
          onClick () {
            cancel()
            _twoButton.close()
          }
        }
      ]
    })
  }

  static showNoticePopup (args) {
    const { title, content } = args
    const _notice = popup.show({
      title: title,
      content: content,
      clickOverlay: () => {
        _notice.close()
      }
    })
  }
}
