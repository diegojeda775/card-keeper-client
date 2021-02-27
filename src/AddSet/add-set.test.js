import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddSet from './add-set'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <AddSet />
    </BrowserRouter>,
    div
  )

expect(div.querySelector('label').textContent).toBe('Title')

  ReactDOM.unmountComponentAtNode(div)
})