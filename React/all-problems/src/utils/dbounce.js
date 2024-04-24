import axios from "axios";

export function useDbounce(setData) {
  let timer;
  return function (value, delay) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      //   console.log(value); // call API
      // setData(value);
      axios
        .get(`http://www.omdbapi.com/?i=tt3896198&apikey=d6ec6d00&s=${value}`)
        .then((res) => {
          let newData = res?.data?.Search || [];
          //   console.log(newData)
          setData(newData);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }, delay);
  };
}
