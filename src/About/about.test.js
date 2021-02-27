import React from 'react'
import ReactDOM from 'react-dom'
import About from './about'


it('renders without crashing', () => {
  const div = document.createElement('header')
  ReactDOM.render(
    <About />,
    div
  )

expect(div.querySelector('h2').textContent).toBe('About')

  ReactDOM.unmountComponentAtNode(div)
})