import TodoView from './TodoView'

export default function TodoListView({ todoList, onToggle }) {
  return (
    <>
      {todoList.length === 0 ? (
        <p className="text-muted"> no tasks for you...</p>
      ) : (
        <div>
          <h6 className="mt-3">Your tasks for Today:</h6>
          <ol className="list-unstyled">
            {todoList.map((todo) => (
              <TodoView key={todo.id} todo={todo} onToggle={onToggle} />
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
