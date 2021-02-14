import { StrictMode } from "react";
import ReactDOM from "react-dom";
import store from "./redux-demo";
import TodoApp from "./TodoApp";
import App from "./App";

const rootElement = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <StrictMode>
      <App />
      <TodoApp store={store} />
    </StrictMode>,
    rootElement
  );
};

store.subscribe(render);

render();
