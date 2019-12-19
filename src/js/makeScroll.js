import IScroll from 'obigo-js-ui/features/iscroll'

export default class MakeScroll {
  constructor ($element) {
    this._scroll = new IScroll($element, {
      probeType: 2,
      scrollX: false,
      scrollY: true,
      bounce: false,
      mouseWheel: false,
      scrollbars: true,
      fadeScrollbars: true,
      interactiveScrollbars: false,
      click: true,
      disableMouse: !('onmousedown' in window),
      disablePointer: true,
      disableTouch: !('ontouchstart' in window)
    })
  }

  get scrollInstance () {
    return this._scroll
  }
}
