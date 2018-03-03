import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import 'tachyons'
import { Header } from './Header'
import { store } from './AnimationState'
import { getSection, sectionHeight } from './Section'

const Section1 = getSection(1)
const Section2 = getSection(2)
const Section3 = getSection(3)

@observer
class Example extends React.Component {
  renderSection() {

    const { currentSectionId, nextSectionId, isTransitioning, setRefCurrent, setRefNext } = store

    console.log(currentSectionId, nextSectionId);

    return (
      <div
        className="w-50 center ba relative"
        style={{ height: sectionHeight }}
      >

        <div className="w-100 center t0 l0">
          {currentSectionId === 1 && <Section1 key={1} innerRef={setRefCurrent}/>}
          {currentSectionId === 2 && <Section2 key={2} innerRef={setRefCurrent}/>}
          {currentSectionId === 3 && <Section3 key={3} innerRef={setRefCurrent}/>}
        </div>
        <div className="w-100 center t0 l0">
          {nextSectionId === 1 && <Section1 key={1} innerRef={setRefNext}/>}
          {nextSectionId === 2 && <Section2 key={2} innerRef={setRefNext}/>}
          {nextSectionId === 3 && <Section3 key={3} innerRef={setRefNext}/>}
        </div>
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
        <div className="pt2 flex justify-center">
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
