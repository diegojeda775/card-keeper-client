import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Cards from './cards'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Cards  match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>
    </BrowserRouter>,
    div
  )


expect(div.querySelector('button').textContent).toBe('Add Set')
  ReactDOM.unmountComponentAtNode(div)
})