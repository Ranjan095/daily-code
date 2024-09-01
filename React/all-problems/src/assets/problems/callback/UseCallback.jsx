import React, { useCallback, useState } from "react";
import ChildComponent from "./ChildComponent";

const UseCallback = () => {
  let [count, setCount] = useState(0);
  let [countChild, setCountChild] = useState(0);

  let handleChild = useCallback(() => {
    setCountChild((prev) => prev + 1);
  }, []);

  let handleClilck = () => {
    setCount((prev) => prev + 1);
  };

  console.log("ParentComponent");

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">useCallback </h1>
      <div className="text-center my-2">
        <h1 className="text-center text-3xl font-bold">
          Parent-count : {count}{" "}
        </h1>
        <h1 className="text-center text-3xl font-bold">
          child-count : {countChild}{" "}
        </h1>
        <button
          onClick={handleClilck}
          className="bg-green-600 text-white rounded-md p-2"
        >
          Click Parent Count
        </button>
      </div>
      <ChildComponent handleChild={handleChild} />
    </div>
  );
};

export default UseCallback;
