import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { AnimationState } from 'AnimationState'

const store = new AnimationState()

@observer
class Example extends React.Component {
  setTime = (event) => store.setProgress(Number(event.target.value))

  render() {
    console.log('Example render')
    return (
      <div>
        <input
          max="600"
          type="range"
          onChange={this.setTime}
          value={store.progress.value}
        />
        <button onClick={store.start}>start animation</button>
        <Svg time={Math.trunc(store.progress.value)} />
      </div>
    )
  }
}

function Svg({ time }) {
  console.log('Svg render: ', time)
  return (
    <svg style={{ display: 'block', border: '1px solid black' }}>
      <Text />
      <use
        href="#dudeeText01"
        x="0" y="0"
        stroke="#FF3300"
        strokeDashoffset={time}
      />
      <use
        href="#dudeeText01"
        x="0" y="0"
        stroke="#3300FF"
        strokeDashoffset={100 + time}
      />
    </svg>
  )
}

function Text() {
  return (
    <symbol id="dudeeText01">
      <text
        textAnchor="middle"
        x="50%"
        y="50%"
        dy=".35em"
        fontFamily="Raleway"
        fontSize="70"
        fillOpacity="0"
        strokeDasharray="100"
        >DUDEE</text>
    </symbol>
  )
}

ReactDOM.render(<Example />, document.getElementById('root'))
