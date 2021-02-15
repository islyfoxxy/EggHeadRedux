export default function TodoView({ todo, onToggle }) {
  const onClick = () => onToggle(todo.id)
  const style = {
    textDecoration: todo.completed ? 'line-through' : 'none',
    cursor: 'pointer'
  }

  return (
    <li onClick={onClick}>
      {!todo.completed ? <span>✧</span> : <span>✓</span>}{' '}
      <span style={style}>{todo.text}</span>
    </li>
  )
}
