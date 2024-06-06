import React, { useState } from "react";

const HelloWorld = () => {
  let [state, setState] = useState(0);
  return (
    <div>
      <input placeholder="input" />
      <h1>HelloWorld</h1>
      <h1 data-testid="inc-state">{state}</h1>
      <button name="inc-button" onClick={() => setState(++state)}>
        Increase
      </button>
    </div>
  );
};

export default HelloWorld;
