import { useCallback, useMemo, useState } from "react";

import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [count, setCount] = useState(0);
  let [todo, setTodo] = useState(["Todo 1", "Todo 2"]);

  let handleCount = () => {
    setCount((pre) => pre + 1);
  };

  let handleTodo = useCallback(() => {
    setTodo([...todo, `new Todo ${Math.floor(Math.random() * 10 + 1)}`]);
  }, [todo]);

  let expenciveTask = (n) => {
    console.log("expencive task processing......")
    for (let i = 0; i < 1000000000; i++) {
      n++;
    }
    console.log("expencive task completed")
    return n;
  };

  // useMemo 
  let result = useMemo(() => {
    expenciveTask(count);
  }, [count]);

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
