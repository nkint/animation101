import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { AnimationState } from 's02/AnimationState'
import { Transition } from 'react-transition-group'
import 'tachyons'

const store = new AnimationState()

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: 20,
  display: 'inline-block',
  backgroundColor: '#8787d8',
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
}

function Header() {
  return (
    <div className="flex justify-center">
      <h1 className="bb b--black pa2 map">Header</h1>
    </div>
  )
}

@observer
class Example extends React.Component {
  renderSection() {
    const { currentSectionId } = store
    return (
      <div className="flex justify-center">
        <Transition in={inProp} timeout={duration}>
          {(state) => (
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              <h2 className="pa2 map">Section #{currentSectionId}</h2>
            </div>
          )}
        </Transition>
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
            disabled={!(currentSectionId > 0)}
          >Prev</button>
          <button
            onClick={increment}
            disabled={!(currentSectionId < 5)}
          >Next</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
