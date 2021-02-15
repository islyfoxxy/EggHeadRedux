import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'

const addTodoAction = (text) => ({ type: 'ADD_TODO', id: uuidv4(), text })
const toggleTodoAction = (id) => ({ type: 'TOGGLE_TODO', id })
const setVisibFilterAction = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const todo = (state, action) => {
  const { type, id, ...args } = action

  switch (type) {
    case 'ADD_TODO':
      return { ...args, id, completed: false }
    case 'TOGGLE_TODO':
      return state.id === id ? { ...state, completed: !state.completed } : state
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)]
    case 'TOGGLE_TODO':
      return state.map((item) => todo(item, action))
    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(todoApp)
export default store
export { todos, addTodoAction, toggleTodoAction, setVisibFilterAction }

// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// };
