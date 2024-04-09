import { memo } from "react";

const Todo = ({ todo, handleTodo }) => {
  console.log(" Todo Component is relndring...");
  return (
    <div>
      <hr />
      <h1>Todo Component</h1>
      {todo?.map((ele, i) => {
        return (
          <div key={i}>
            <h3>{ele}</h3>
          </div>
        );
      })}
      <button onClick={handleTodo}>Add todo</button>
    </div>
  );
};

export default memo(Todo);
