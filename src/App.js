import './styles.css'
import store from './reduxStore'
import TodoApp from './TodoApp'
import './test'

export default function App() {
  return (
    <div className="App">
      <TodoApp store={store} />
    </div>
  )
}
