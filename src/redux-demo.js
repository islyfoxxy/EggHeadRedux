import deepFreeze from "deep-freeze";
import expect from "expect";
import { createStore, combineReducers } from "redux";

const todo = (state, action) => {
  const { type, ...args } = action;
  switch (type) {
    case "ADD_TODO":
      return { ...args, comleted: false };
    case "TOGGLE_TODO":
      return state.id === args.id
        ? { ...state, comleted: !todo.comleted }
        : state;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map((item) => todo(item, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// };

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const testAddTodo = () => {
  const stateBefore = [];
  const action = { type: "ADD_TODO", id: 0, text: "Learn Redux" };
  const stateAfter = [{ id: 0, text: "Learn Redux", comleted: false }];

  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    { id: 0, text: "Learn Redux", comleted: false },
    { id: 1, text: "Go shopping", comleted: false }
  ];
  const action = { type: "TOGGLE_TODO", id: 1 };
  const stateAfter = [
    { id: 0, text: "Learn Redux", comleted: false },
    { id: 1, text: "Go shopping", comleted: true }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();

// const store = createStore(todos);
const store = createStore(todoApp);
console.log("Initial state:", store.getState());
store.dispatch({ type: "ADD_TODO", id: 0, text: "Learn Redux!" });
console.log("After ADD_TODO state:", store.getState());
store.dispatch({ type: "ADD_TODO", id: 1, text: "Do Shopping!" });
console.log("After ADD_TODO state:", store.getState());
store.dispatch({ type: "TOGGLE_TODO", id: 1 });
console.log("After TOGGLE_TODO state:", store.getState());

store.dispatch({ type: "SET_VISIBILITY_FILTER", filter: "SHOW_COMPLETED" });
console.log("After SET_VISIBILITY_FILTER state:", store.getState());

console.log("All Test Passed!");

export default store;
