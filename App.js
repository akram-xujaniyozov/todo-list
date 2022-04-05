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
