import { useRef, useState } from "react";

const Counter = () => {
  let [count, setCounte] = useState(0);
  let interval = useRef(null);

  let handleClick = () => {
    if (interval.current) return;

    interval.current = setInterval(() => {
      setCounte((prev) => prev + 1);
    }, 1000);
  };

  let stopInterval = () => {
    clearInterval(interval.current);
    // console.log(interval);
    interval.current = null;
  };

  let resetCount = () => {
    stopInterval();
    setCounte(0);
  };

  return (
    <div
      style={{
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h1 style={{ fontSize: "100px" }}>{count}</h1>
      <button
        onClick={handleClick}
        style={{
          background: "gray",
          padding: "5px 10px 5px 10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        Start Count
      </button>
      <button
        onClick={stopInterval}
        style={{
          marginLeft: "20px",
          background: "gray",
          padding: "5px 10px 5px 10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        Stop Count
      </button>
      <button
        onClick={resetCount}
        style={{
          marginLeft: "20px",
          background: "gray",
          padding: "5px 10px 5px 10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        Reset Count
      </button>
    </div>
  );
};

export default Counter;
