import { useRef } from 'react'

let nextTodoId = 2

export default function TodoApp({ store }) {
  const inputRef = useRef()
  const onAddNewTask = () => {
    inputRef.current.value.length > 0 &&
      store.dispatch({
        type: 'ADD_TODO',
        text: inputRef.current.value,
        id: nextTodoId++
      })
    inputRef.current.value = ''
  }
  const onToggleTask = ({ target: { dataset } }) => {
    const id = parseInt(dataset.id, 10)
    store.dispatch({ type: 'TOGGLE_TODO', id })
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={onAddNewTask}>Add Todo</button>
      <ul>
        {store.getState().todos.map((todo) => (
          <li
            style={{ textDecoration: todo.comleted ? 'line-through' : 'none' }}
            onClick={onToggleTask}
            data-id={todo.id}
            key={todo.id}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
