import { observable, action } from 'mobx'
import { isNil } from 'lodash'
import Tweenr from 'tweenr'
import { sectionHeight } from './Section'

const tweenSection = Tweenr()

export class AnimationState {
  @observable currentSectionId = 1
  @observable nextSectionId = null
  @observable isTransitioning = false
  @observable direction = null
  refCurrent = null
  refNext = null

  sectionUpDown = { value: 0 }

  @action.bound
  increment() {
    // console.log('increment');
    this.nextSectionId = this.currentSectionId + 1
    this.direction = 'down'
    this.isTransitioning = true
  }

  @action.bound
  decrement() {
    // console.log('decrement');
    this.nextSectionId = this.currentSectionId - 1
    this.direction = 'up'
    this.isTransitioning = true
  }

  @action.bound
  endTransitioning() {
    this.isTransitioning = false
    this.currentSectionId = this.nextSectionId
    this.nextSectionId = null
    this.direction = null
  }

  setRefCurrent = ref => {
    // console.log('setRefCurrent');
    this.refCurrent = ref
  }

  goDown = () => {
    this.sectionUpDown.value = 0
    const target = sectionHeight

    tweenSection
    .to(this.sectionUpDown, { value: target, duration: 1 })
    .on('update', () => {
      this.refCurrent.style.top = `${-this.sectionUpDown.value}px`
      this.refNext.style.top = `${sectionHeight - this.sectionUpDown.value}px`
    })
    .on('complete', () => {
      this.endTransitioning()
    })
  }

  goUp = () => {
    this.refNext.style.top = `${-sectionHeight}px`
    this.sectionUpDown.value = 0
    const target = -sectionHeight

    tweenSection
    .to(this.sectionUpDown, { value: target, duration: 1 })
    .on('update', () => {
      this.refCurrent.style.top = `${-this.sectionUpDown.value}px`
      this.refNext.style.top = `${-sectionHeight - this.sectionUpDown.value}px`
    })
    .on('complete', () => {
      this.endTransitioning()
    })
  }

  setRefNext = ref => {
    // console.log('setRefNext');
    this.refNext = ref

    if (isNil(this.refNext)) {
      return
    }

    if (this.direction === 'down') {
      this.goDown()
    } else if (this.direction === 'up') {
      this.goUp()
    }
  }
}

export const store = new AnimationState()
