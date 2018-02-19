import { observable, action } from 'mobx'

export const DWARF = 'go small'
export const EXPAND = 'go big'

export class AnimationState {
  @observable isTransitioning = false
  @observable direction = null

  @observable currentSectionId = 0
  @observable currentSectionIdPre = 0
  nextSectionId = null

  @action.bound
  setSection(nextSection) {
    this.isTransitioning = true

    if (this.currentSectionId === 0 && nextSection !== 0) {
      this.direction = DWARF
    }

    if (this.currentSectionId !== 0 && nextSection === 0) {
      this.direction = EXPAND
    }

    this.nextSectionId = () => {
      this.currentSectionIdPre = this.currentSectionId
      this.currentSectionId = nextSection
    }
  }

  @action.bound
  endTransitioning() {
    this.isTransitioning = false
    this.nextSectionId()
  }
}
