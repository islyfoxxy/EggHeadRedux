import { useRef } from "react";

let nextTodoId = 2;

export default function TodoApp({ store }) {
  const inputRef = useRef();

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button
        onClick={() => {
          inputRef.current.value.length > 0 &&
            store.dispatch({
              type: "ADD_TODO",
              text: inputRef.current.value,
              id: nextTodoId++
            });
          inputRef.current.value = "";
        }}
      >
        Add Todo
      </button>
      <ul>
        {store.getState().todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
