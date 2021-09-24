/* Wrong code */

/* eslint-disable */
/*import "./styles.css";
import { useState, useRef, useEffect } from "react";

const generateId = (() => {
  let count = 0;

  return () => {
    return ++count;
  };
})();

/**
 * This is a todo app with multiple bugs and badly written lines.
 * Can you fix these bugs and make code follow good practices?
 * В этом коде есть несколько багов и гавнокода, ты можешь это исправить?
 * Можно воспользоватся кодсандбоксом для исправления кода: https://codesandbox.io/s/new?file=/src/App.js:0-1806
 */

/*export default function App() {
  const [todos, changeTodos] = useState([]);
  const [value, changeValue] = useState("");
  const inputRef = useRef('foo');
  const addTodo = () => {
    const newTodo = {
      text: value,
      id: generateId(),
    };
    todos.unshift(newTodo);

    changeTodos(todos);
  };

  const handleDelete = (id) => {
    if (todos.includes(id)) {
      const newTodos = todos.filter((todo) => todo.id != id);
      changeTodos(newTodos);
    }
  };

  const handleComplete = (id, index) => {
    const item = todos.find((item, ii) => ii === index);
    item.complete = true;
    changeTodos(todos);
  };

  useEffect(() => {
    // inputRef.current.focus();

    return () => changeValue("");
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        ref={inputRef}
        value={value}
        onChange={(ev) => changeValue(ev.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      {todos.map((todo, index) => (
        <li key={todo.id}>
          {todo.complete ?
            <strike>{todo.text}</strike>
          :
            todo.text
          }
          <button onClick={() => handleComplete(todo.id, index)}>complete</button>
          <button onClick={() => handleDelete(todo.id)}>delete</button>
        </li>
      ))}
    </div>
  );
} */


/* Correct code */

import { useState, useEffect, useRef } from "react";

const generateId = (() => {
  let count = 0;

  return () => {
    return ++count;
  };
})();


export default function App() {
  const [todos, changeTodos] = useState([]);
  const [value, changeValue] = useState("");
  const inputRef = useRef(null);
 
  useEffect(() => {
    inputRef.current.focus();
  });

  const addTodo = (e) => {
    e.preventDefault();
    
    if(value === "") {
      return;
    }else {
      const newTodo = {
        text: value,
        id: generateId(),
        complete: false
      };
    
      changeTodos([...todos].concat(newTodo));
    }
    changeValue("");
  };

  const handleDelete = (id) => {
    const updateTodos = [...todos].filter((todo) => todo.id != id);
      
    changeTodos(updateTodos);
  };

  const handleComplete = (id) => {
    const item = [...todos].map(todo => {
      if(todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo
    });
   
    changeTodos(item);
  };

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          ref={inputRef}
          value={value}
          onChange={(ev) => changeValue(ev.target.value)}
        />
         <button type="submit">Add</button>
      </form>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          {todo.complete ?
            <strike>{todo.text}</strike>
          :
            todo.text
          }
          <button onClick={() => handleComplete(todo.id)}>complete</button>
          <button onClick={() => handleDelete(todo.id)}>delete</button>
        </li>
      ))}
    </div>
  );
}
