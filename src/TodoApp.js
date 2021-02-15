import { useRef, useEffect, useState } from 'react'
import VisibilityFilter from './VisibilityFilter'

export default function TodoApp({ store }) {
  const inputRef = useRef()
  const [tasks, setTaskes] = useState([])

  const updateData = () => {
    const { todos, visibilityFilter } = store.getState()
    const visibleTodos =
      visibilityFilter === 'SHOW_COMPLETED'
        ? todos.filter((item) => item.completed === true)
        : visibilityFilter === 'SHOW_ACTIVE'
        ? todos.filter((item) => item.completed === false)
        : todos
    setTaskes(visibleTodos || [])
  }

  store.subscribe(updateData)

  const onAddNewTask = () => {
    inputRef.current.value.length > 0 &&
      store.dispatch({
        type: 'ADD_TODO',
        text: inputRef.current.value
      })
    inputRef.current.value = ''
  }

  const onToggleTask = ({ target: { dataset } }) => {
    store.dispatch({ type: 'TOGGLE_TODO', id: dataset.id })
  }

  useEffect(() => {
    const { todos, visibilityFilter } = store.getState()
    const visibleTodos =
      visibilityFilter === 'SHOW_COMPLETED'
        ? todos.filter((item) => item.completed)
        : visibilityFilter === 'SHOW_ACTIVE'
        ? todos.filter((item) => !item.completed)
        : todos
    setTaskes(visibleTodos || [])
  }, [store])

  return (
    <div className="row justify-content-center m-5">
      <div className="col-xs-12 col-md-8 card">
        <div className="card-body">
          <h5 className="card-title">Simple ToDo List</h5>
          <h6 className="card-subtitle mb-2 text-muted">using Redux</h6>
          <div className="input-group mb-3">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              placeholder="enter your new task"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              type="button"
              onClick={onAddNewTask}
              className="btn btn-outline-secondary"
            >
              Add ToDo
            </button>
          </div>
          <hr className="my-5" />
          {tasks.length === 0 ? (
            <p> no tasks for you...</p>
          ) : (
            <ol className="list-unstyled">
              {tasks.map((todo) => (
                <li
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={onToggleTask}
                  data-id={todo.id}
                  key={todo.id}
                >
                  {todo.text}
                </li>
              ))}
            </ol>
          )}
          <VisibilityFilter store={store} />
        </div>
      </div>
    </div>
  )
}
