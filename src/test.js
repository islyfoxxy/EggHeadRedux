import deepFreeze from 'deep-freeze'
import expect from 'expect'
import store, { addTodoAction, todos } from './reduxStore'

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

store.dispatch(addTodoAction('Learn Redux!'))
store.dispatch(addTodoAction('Do Shopping!'))
console.log('All Test Passed!')
