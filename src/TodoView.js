export default function TodoView({ id, completed, text, onToggle }) {
  const onClick = () => onToggle(id)
  const style = {
    textDecoration: completed ? 'line-through' : 'none',
    cursor: 'pointer'
  }

  return (
    <li onClick={onClick}>
      {!completed ? <span>✧</span> : <span>✓</span>}{' '}
      <span style={style}>{text}</span>
    </li>
  )
}
