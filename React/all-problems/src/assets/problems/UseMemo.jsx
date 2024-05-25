import React, { useMemo, useState } from "react";

const UseMemo = () => {
  let [counter1, setCounter1] = useState(0);
  let [counter2, setCounter2] = useState(0);

  let expenciveCounter = useMemo(() => {
    expenciveCalculation(counter2);
  }, [counter2]);

  let handleCounter1 = () => {
    setCounter1(++counter1);
  };

  let handleCounter2 = () => {
    setCounter2(++counter2);
  };

  function expenciveCalculation(counter2) {
    while (counter2 <= 1000000000) {
      ++counter2;
    }
    return counter2;
  }

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
