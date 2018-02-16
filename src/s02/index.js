import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { AnimationState } from 's02/AnimationState'
import 'tachyons'

const store = new AnimationState()

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
        <h1 className="bb b--black pa2 map">Section #{currentSectionId}</h1>
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
