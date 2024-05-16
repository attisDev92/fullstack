import React from 'react'
import ReactDom from 'react-dom'
import reducer from './reducers/reducer'
import { createStore } from 'redux'

const store = createStore(reducer)

const App = () => {

  const handleDispatch = (type) => {
    store.dispatch({
      type: type
    })
  }

  return (
    <>
      <button onClick={() => handleDispatch('GOOD')}>
        good
      </button>
      <button onClick={() => handleDispatch('OK')}>
        ok
      </button>
      <button onClick={() => handleDispatch('BAD')}>
        bad
      </button>
      <button onClick={() => handleDispatch('ZERO')}>
        reset stats
      </button>

      <div>
        good: {store.getState().good}
      </div>
      <div>
        ok: {store.getState().ok}
      </div>
      <div>
        bad: {store.getState().bad}
      </div>
    </>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App/>)
}

renderApp()

store.subscribe(renderApp)

