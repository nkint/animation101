import React, { Component } from 'react'
import Tweenr from 'tweenr'
import { noop } from 'lodash'
import { store } from './AnimationState'

const style = {
  top: 0,
}

const animationOptions = {
  duration: 1,
  ease: 'expoOut',
}

export const sectionHeight = 95

export function getSection(index) {
  class Section extends Component {
    tween = null
    opacity = { value: 0 }

    componentDidMount() {
      // console.log('componentDidMount');
      this.tween = Tweenr()
    }

    componentWillUnmount() {
      // console.log('componentWillUnmount');
      this.tween.dispose()
    }

    show(done = noop) {
      console.log('section show');
      this.tween.cancel().to(this.opacity, {
        value: 1,
        delay: 0,
        ...animationOptions,
      }).on('complete', done)
    }

    hide(done = noop) {
      console.log('section hide');
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
      const { innerRef } = this.props
      return (
        <div
          className="absolute w-100 ba b--light-gray flex justify-center"
          style={{ height: sectionHeight, ...style }}
          ref={innerRef}
        >
          <h2 className="pa2 map">Section #{index}</h2>
        </div>
      )
    }
  }
  return Section
}
