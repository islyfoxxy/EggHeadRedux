import { useRef } from 'react'

export default function AddTodoForm({ onAddTodo }) {
  const inputRef = useRef()
  const onClick = () => {
    inputRef.current.value.length > 0 && onAddTodo(inputRef.current.value)
    inputRef.current.value = ''
  }
  return (
    <div className="input-group mb-3">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="enter your new task"
        aria-label="new tasks title"
      />
      <button
        type="button"
        onClick={onClick}
        className="btn btn-outline-secondary"
      >
        Add ToDo
      </button>
    </div>
  )
}
