import React, { useMemo, useState } from "react";

const UseMemo = () => {
  let [counter1, setCounter1] = useState(0);
  let [counter2, setCounter2] = useState(0);

  useMemo(() => {
    (function expenciveTask() {
      for (let i = 0; i < 2000000000; i++) {
        continue;
      }
    })();
  }, [counter2]);

  let handleCounter1 = () => {
    setCounter1((prev) => prev + 1);
  };

  let handleCounter2 = () => {
    setCounter2((prev) => prev + 1);
  };

  return (
    <div className=" m-4 text-center">
      <h1 className=" text-3xl font-bold ">UseMemo</h1>
      <div className=" flex justify-evenly">
        <div>
          <h1 className=" text-2xl text-gray-600 font-bold">
            Counter1 : {counter1}
          </h1>
          <button
            onClick={handleCounter1}
            className=" font-bold bg-slate-700 text-white rounded-md p-2 m-2 hover:bg-slate-500"
          >
            Click-Me
          </button>
        </div>
        <div>
          <h1 className=" text-2xl text-gray-600 font-bold">
            Counter2 : {counter2}
          </h1>

          <button
            onClick={handleCounter2}
            className=" font-bold bg-slate-700 text-white rounded-md p-2 m-2 hover:bg-slate-500"
          >
            Click-Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseMemo;
