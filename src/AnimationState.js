import { observable, action } from 'mobx'
import tweenr from 'tweenr'

export class AnimationState {
  @observable progress = {
    value: 0,
  }
  tween = null

  constructor() {
    this.tween = tweenr()
  }

  @action.bound
  start() {
    console.log(this, this.tween, this.progress.value)
    this.tween.to(this.progress, {
      value: 600,
      ease: 'expoOut',
      duration: 10,
      delay: 0.25,
    })
  }

  @action.bound
  setProgress(n) {
    this.tween.cancel()
    this.progress.value = n
  }
}
