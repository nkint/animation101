import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { AnimationState } from 's02/AnimationState'
import ReactTransitionGroup from 'react-addons-transition-group'
import 'tachyons'
import Tweenr from 'tweenr'
import { noop } from 'lodash'

const store = new AnimationState()

function Header() {
  return (
    <div className="flex justify-center">
      <h1 className="bb b--black pa2 map">Header</h1>
    </div>
  )
}

const style = {
  top: 0,
}

const animationOptions = {
  duration: 1,
  ease: 'expoOut',
}

function getSection(index) {
  class Section extends React.Component {
    tween = null
    opacity = { value: 0 }
    state = {
      opacityValue: 0,
    }

    componentDidMount() {
      // console.log('componentDidMount');
      this.tween = Tweenr()
      this.tween.on('tick', () => {
        // console.log(this.opacity);
        if (this.state.opacityValue !== this.opacity.value) {
          this.setState({ opacityValue: this.opacity.value })
        }
      })
    }

    componentWillUnmount() {
      // console.log('componentWillUnmount');
      this.tween.dispose()
    }

    componentWillAppear(done) {
      // console.log('componentWillEnter');
      this.show()
      return done()
    }

    componentWillEnter(done) {
      // console.log('componentWillEnter');
      this.show()
      return done()
    }

    componentWillLeave(done) {
      // console.log('componentWillLeave');
      this.hide(done)
    }

    componentDidLeave() {
      // console.log('componentDidLeave');
    }

    show(done = noop) {
      this.tween.cancel().to(this.opacity, {
        value: 1,
        delay: 0,
        ...animationOptions,
      }).on('complete', done)
    }

    hide(done = noop) {
      this.tween.cancel().to(this.opacity, {
        value: 0,
        delay: 0,
        ...animationOptions,
      }).on('complete', () => {
        store.endTransitioning()
        return done()
      })
    }

    render() {
      return (
        <div className="demo1" style={{ ...style, opacity: this.state.opacityValue }}>
          <h2 className="pa2 map">Section #{index}</h2>
        </div>
      )
    }
  }
  return Section
}

@observer
class Example extends React.Component {
  renderSection() {
    const Section1 = getSection(1)
    const Section2 = getSection(2)
    const Section3 = getSection(3)

    const { currentSectionId, isTransitioning } = store

    return (
      <div className="flex justify-center">
        <ReactTransitionGroup>
          {(!isTransitioning && currentSectionId === 1) && <Section1 key={1} />}
          {(!isTransitioning && currentSectionId === 2) && <Section2 key={2} />}
          {(!isTransitioning && currentSectionId === 3) && <Section3 key={3} />}
        </ReactTransitionGroup>
      </div>
    )
  }

  render() {
    console.log('Example render')
    const { currentSectionId, increment, decrement } = store
    return (
      <div>
        <Header />
        {
          this.renderSection()
        }
        <div className="flex justify-center">
          <button
            onClick={decrement}
            disabled={!(currentSectionId > 1)}
          >Prev</button>
          <button
            onClick={increment}
            disabled={!(currentSectionId < 3)}
          >Next</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
