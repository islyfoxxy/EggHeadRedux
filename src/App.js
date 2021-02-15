import React from 'react'
import './styles.css'
import store from './reduxStore'
import TodoApp from './TodoApp'

import StoreContext from './StoreContext'
export default function App() {
  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        <TodoApp />
      </StoreContext.Provider>
    </div>
  )
}
