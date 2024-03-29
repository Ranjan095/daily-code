let memoize = [];

let fn = (n) => {
  //   console.log(memoize);
  if (memoize[n]) {
    console.log("memoizeizing");
    return memoize[n];
  } else {
    let count = 0;
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        count++;
      }
    }
    memoize[n] = count;
    console.log("normalized");
    return count;
  }
};
console.time();
console.log(fn(100000));
console.timeEnd();
console.time();
console.log(fn(100000));
console.timeEnd();
console.time();
console.log(fn(100000));
console.timeEnd();
console.time();
console.log(fn(100000));
console.timeEnd();
