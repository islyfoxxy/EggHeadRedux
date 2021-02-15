import deepFreeze from 'deep-freeze'
import expect from 'expect'
import store, { todos } from './reduxStore'

const testAddTodo = () => {
  const stateBefore = []
  const action = { type: 'ADD_TODO', id: '1', text: 'Learn Redux' }
  const stateAfter = [{ id: '1', text: 'Learn Redux', completed: false }]

  deepFreeze(stateBefore)
  deepFreeze(action)
  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

const testToggleTodo = () => {
  const stateBefore = [{ id: 1, text: 'Go shopping', completed: true }]
  const action = { type: 'TOGGLE_TODO', id: 1 }
  const stateAfter = [{ id: 1, text: 'Go shopping', completed: false }]

  deepFreeze(stateBefore)
  deepFreeze(action)
  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

testAddTodo()
testToggleTodo()

// console.log('Initial state:', store.getState())
store.dispatch({ type: 'ADD_TODO', text: 'Learn Redux!' })
store.dispatch({ type: 'ADD_TODO', text: 'Do Shopping!' })
// store.dispatch({ type: 'TOGGLE_TODO', id: 1 })
// store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' })
// console.log('After SET_VISIBILITY_FILTER state:', store.getState())
console.log('All Test Passed!')
