import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Instructions from './instructions'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Instructions />
    </BrowserRouter>,
    div
  )

expect(div.querySelector('h2').textContent).toBe('Welcome to card Kepper App')
expect(div.querySelector('button').textContent).toBe('Cards')
  ReactDOM.unmountComponentAtNode(div)
})