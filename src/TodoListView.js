import { useContext, useEffect, useState } from 'react'
import StoreContext from './StoreContext'
import TodoView from './TodoView'

export default function TodoListView({ onToggle }) {
  const store = useContext(StoreContext)
  const [todoList, setTodoList] = useState(store.getState().todos || [])

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { todos, visibilityFilter } = store.getState()
      const visibleTodos =
        visibilityFilter === 'SHOW_COMPLETED'
          ? todos.filter((item) => item.completed)
          : visibilityFilter === 'SHOW_ACTIVE'
          ? todos.filter((item) => !item.completed)
          : todos
      setTodoList(visibleTodos || [])
    })

    return () => {
      unsubscribe()
    }
  }, [store])

  return (
    <>
      {todoList.length === 0 ? (
        <p className="text-muted"> no tasks for you...</p>
      ) : (
        <div>
          <h6 className="mt-3">Your tasks for Today:</h6>
          <ol className="list-unstyled">
            {todoList.map((todo) => (
              <TodoView key={todo.id} {...todo} onToggle={onToggle} />
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
