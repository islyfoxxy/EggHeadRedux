import { useEffect, useState, useContext } from 'react'
import VisibilityFilter from './VisibilityFilter'
import TodoListView from './TodoListView'
import AddTodoForm from './AddTodoForm'
import {
  addTodoAction,
  toggleTodoAction,
  setVisibFilterAction
} from './reduxStore'
import './test'
import StoreContext from './StoreContext'

export default function TodoApp() {
  const store = useContext(StoreContext)
  const [filter, setFilter] = useState(store.getState().visibilityFilter)
  const onAddTodo = (title) => store.dispatch(addTodoAction(title))
  const onToggle = (id) => store.dispatch(toggleTodoAction(id))
  const onFilterChange = (filter) =>
    store.dispatch(setVisibFilterAction(filter))

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { visibilityFilter } = store.getState()
      setFilter(visibilityFilter)
    })

    return () => {
      unsubscribe()
    }
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
          <TodoListView onToggle={onToggle} />
        </div>
      </div>
    </div>
  )
}
