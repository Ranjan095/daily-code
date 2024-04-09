import { useCallback, useState } from "react";

import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [count, setCount] = useState(0);
  let [todo, setTodo] = useState(["Todo 1", "Todo 2"]);

  let handleCount = () => {
    setCount((pre) => pre + 1);
  };

  // let handleCount = useCallback(() => {
  //   setCount((prev) => prev + 1);
  // }, [count]);

  let handleTodo = useCallback(() => {
    setTodo([...todo, `new Todo ${Math.floor(Math.random() * 10 + 1)}`]);
  }, [todo]);

  return (
    <div>
      <h1>Memo, callBack(), useMeme()</h1>
      <h2>Count : {count}</h2>
      <button onClick={handleCount}>+</button>
      <Todo todo={todo} handleTodo={handleTodo} />
    </div>
  );
}

export default App;
