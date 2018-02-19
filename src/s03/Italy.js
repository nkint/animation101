import React from 'react'
import { observer } from 'mobx-react'
import { DWARF, EXPAND } from './AnimationState'
import Tweenr from 'tweenr'
import { cloneDeep } from 'lodash'

import { store } from './'

const animationOptions = {
  duration: 1,
  ease: 'expoOut',
}

const mapSmallPosition = {
  position: [20, 20],
  radius: 10,
  duration: 1,
}

const mapBigPosition = {
  position: [150, 150],
  radius: 90,
}

const linePosition1 = {
  x1: 20,
  y1: 20,
  x2: 90,
  y2: 10,
}

const linePosition2 = {
  x1: 20,
  y1: 20,
  x2: 90,
  y2: 30,
}

const linePosition3 = {
  x1: 20,
  y1: 20,
  x2: 90,
  y2: 50,
}

const lines = [linePosition1, linePosition2, linePosition3]

@observer
export class Italy extends React.Component {
  tween = null
  animation = null

  mapRef = null
  lineRed = null

  valueMap = { ...cloneDeep(mapBigPosition) }
  valueLine = { value: 100 }

  state = {
    map: { ...cloneDeep(mapBigPosition) },
    line: { ...cloneDeep(this.valueLine) },
  }

  updateState = () => {
    const { valueMap, valueLine } = this

    if (this.state.map.radius !== valueMap.radius) {
      this.setState({ map: { ...valueMap } })
    }
    if (this.state.line.value !== valueLine.value) {
      this.setState({ line: { ...valueLine } })
    }
  }

  componentDidMount() {
    this.tween = Tweenr()

    this.tween.on('tick', this.updateState)
  }

  componentWillUnmount() {
    this.tween.dispose()
  }

  openLens = (onComplete) => {
    this.tween.to(this.valueLine, {
      value: 0,
      ...animationOptions,
    })
    .on('complete', onComplete)
  }

  closeLens = onComplete => {
    const { tween } = this

    tween
    .cancel()
    .to(this.valueLine, {
      value: 100,
      ...animationOptions,
    })
    .on('complete', onComplete)
  }

  dwarf = () => {
    console.log('dwarf')
    const { tween, valueMap } = this

    this.animation = true
    tween
    .cancel()
    .to(valueMap, { ...cloneDeep(mapSmallPosition), ...animationOptions })
    .on('complete', () => {
      this.openLens(() => { this.animation = null })
      store.endTransitioning()
    })
  }

  expand = () => {
    console.log('expand')
    const { tween, valueMap } = this

    this.animation = true
    this.closeLens(() => {
      tween
      .to(valueMap, { ...cloneDeep(mapBigPosition), ...animationOptions })
      .on('complete', () => {
        this.animation = null
        store.endTransitioning()
      })
    })
  }

  startAnimation = direction => {
    console.log('Italy > startAnimation')

    if (direction === DWARF) {
      this.dwarf()
    } else if (direction === EXPAND) {
      this.expand()
    }
  }

  render() {
    const { isTransitioning, direction } = store

    if (this.mapRef && isTransitioning && this.animation === null) {
      this.startAnimation(direction)
    }

    const { currentSectionId } = store
    const currentLine = currentSectionId === 0
      ? {}
      : lines[currentSectionId - 1]

    return (
      <g>
        <circle
          ref={ref => { this.mapRef = ref }}
          cx={this.state.map.position[0]}
          cy={this.state.map.position[1]}
          r={this.state.map.radius}
        />
        <line
          {...currentLine}
          strokeDasharray="100"
          strokeDashoffset={this.state.line.value}
          fillOpacity="0"
          stroke="red"
        />
      </g>
    )
  }
}
