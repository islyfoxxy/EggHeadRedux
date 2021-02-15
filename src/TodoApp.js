import { useEffect, useState } from 'react'
import VisibilityFilter from './VisibilityFilter'
import TodoListView from './TodoListView'
import AddTodoForm from './AddTodoForm'

export default function TodoApp({ store }) {
  const [tasks, setTaskes] = useState([])
  const [filter, setFilter] = useState([])

  const updateData = () => {
    const { todos, visibilityFilter } = store.getState()
    const visibleTodos =
      visibilityFilter === 'SHOW_COMPLETED'
        ? todos.filter((item) => item.completed)
        : visibilityFilter === 'SHOW_ACTIVE'
        ? todos.filter((item) => !item.completed)
        : todos
    setTaskes(visibleTodos || [])
    setFilter(visibilityFilter)
  }

  store.subscribe(updateData)

  const onAddTodo = (title) => store.dispatch({ type: 'ADD_TODO', text: title })
  const onToggle = (id) => store.dispatch({ type: 'TOGGLE_TODO', id })
  const onFilterChange = (filter) =>
    store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })

  useEffect(() => {
    const { todos, visibilityFilter } = store.getState()
    const visibleTodos =
      visibilityFilter === 'SHOW_COMPLETED'
        ? todos.filter((item) => item.completed)
        : visibilityFilter === 'SHOW_ACTIVE'
        ? todos.filter((item) => !item.completed)
        : todos
    setTaskes(visibleTodos || [])
    setFilter(visibilityFilter)
  }, [store])

  return (
    <div className="row justify-content-center m-5">
      <div className="col-xs-12 col-md-8 card">
        <div className="card-body">
          <h5 className="card-title">Simple ToDo List</h5>
          <h6 className="card-subtitle mb-2 text-muted">using Redux</h6>
          <AddTodoForm onAddTodo={onAddTodo} />
          <VisibilityFilter
            currentFilter={filter}
            onFilterChange={onFilterChange}
          />
          <TodoListView todoList={tasks} onToggle={onToggle} />
        </div>
      </div>
    </div>
  )
}
