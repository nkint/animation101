import React, { Component } from 'react'

export const sectionHeight = 95

export function getSection(index) {
  class Section extends Component {
    render() {
      const { innerRef } = this.props
      return (
        <div
          className="absolute w-100 ba b--light-gray flex justify-center"
          style={{ height: sectionHeight }}
          ref={innerRef}
        >
          <h2 className="pa2 map">Section #{index}</h2>
        </div>
      )
    }
  }
  return Section
}
