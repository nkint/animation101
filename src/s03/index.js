import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { AnimationState, DWARF, EXPAND } from './AnimationState'
import ReactTransitionGroup from 'react-addons-transition-group'
import 'tachyons'
import Tweenr from 'tweenr'
import { noop } from 'lodash'

const store = new AnimationState()

const animationOptions = {
  duration: 1,
  ease: 'expoOut',
}

@observer
class Italy extends React.Component {
  tween = null
  ref = null
  animation = null
  value = {
    position: [150, 150],
    radius: 90,
  }
  state = { ...this.value }

  componentDidMount() {
    this.tween = Tweenr()

    this.tween.on('tick', () => {
      const { value } = this
      if (this.state.radius !== value.radius) {
        this.setState(value)
      }
    })
  }

  componentWillUnmount() {
    this.tween.dispose()
  }

  startAnimation = direction => {
    console.log('Italy > startAnimation')
    const { tween, value } = this
    if (direction === DWARF) {
      this.animation = tween
      .cancel()
      .to(value, {
        position: [20, 20],
        radius: 10,
        duration: 1,
      })
      .on('complete', () => {
        this.animation = null
        store.endTransitioning()
      })
    } else if (direction === EXPAND) {
      this.animation = tween
      .cancel()
      .to(value, {
        position: [150, 150],
        radius: 90,
        duration: 1,
      })
      .on('complete', () => {
        this.animation = null
        store.endTransitioning()
      })
    }
  }

  render() {
    const { isTransitioning, direction } = store

    if (this.ref && isTransitioning && this.animation === null) {
      this.startAnimation(direction)
    }

    return (
      <g>
        <circle
          ref={ref => { this.ref = ref }}
          cx={this.state.position[0]}
          cy={this.state.position[1]}
          r={this.state.radius}
        />
      </g>
    )
  }
}

@observer
class Example extends React.Component {
  buildSetSection = (index) => {
    const { setSection } = store
    return () => setSection(index)
  }

  render() {
    console.log('Example render')
    const { currentSectionId, isTransitioning } = store
    const showButtons = currentSectionId === 0 && (!isTransitioning)
    return (
      <div className="ma2 pa2">
        <div className="mb3">
          {showButtons
            ? (<div>
              <button onClick={this.buildSetSection(1)}>1</button>
              <button onClick={this.buildSetSection(2)}>2</button>
              <button onClick={this.buildSetSection(3)}>3</button>
              <button onClick={this.buildSetSection(4)}>4</button>
            </div>)
            : (<div>
              <button onClick={this.buildSetSection(0)}>exit</button>
            </div>)
          }
        </div>

        <div className="ba" style={{ width: 300, height: 300 }}>
          <svg width={300} height={300}>
            <Italy />
          </svg>
        </div>

      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
