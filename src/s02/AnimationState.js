import { observable, action } from 'mobx'

export class AnimationState {
  @observable currentSectionId = 1
  @observable isTransitioning = false
  nextOperation = null

  @action.bound
  increment() {
    this.nextOperation = () => this.currentSectionId++
    this.isTransitioning = true
  }

  @action.bound
  decrement() {
    this.nextOperation = () => this.currentSectionId--
    this.isTransitioning = true
  }

  @action.bound
  endTransitioning() {
    this.isTransitioning = false
    this.nextOperation()
  }
}
