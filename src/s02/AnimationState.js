import { observable, action } from 'mobx'
import tweenr from 'tweenr'

export class AnimationState {
  @observable currentSectionId = 0

  @action.bound
  increment() {
    this.currentSectionId++
  }

  @action.bound
  decrement() {
    this.currentSectionId--
  }
}
