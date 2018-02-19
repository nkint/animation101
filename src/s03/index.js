import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { AnimationState } from './AnimationState'
import 'tachyons'
import { Italy } from './Italy'

export const store = new AnimationState()

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
