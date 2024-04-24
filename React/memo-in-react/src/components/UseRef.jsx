import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const inputRef = useRef(null);


let foo=()=>{
    console.log(x);
    // var x=10;
    // let x=2;
    
    const x=4;
}
foo()

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button>Submit</button>
    </div>
  );
};

export default MyComponent;
