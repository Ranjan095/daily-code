/** @format */

// /** @format */

// let p = new Promise((resolve, reject) => {
//   return resolve("hello");
// });

// /** async function return always a promise */
// async function get_data() {
//   let res = await fetch("https://api.github.com/users");
//   let data = await res.json();

//   return data;
// }

// /** it will print Promese */
// let result = get_data();
// console.log(result); // Promise

// /** it will print value */
// get_data().then((res) => {
//   console.log(res);
// });

// // async await is used to handle promise in a cleaner way.

{
  /*** new formData() ***/
}

let data = new FormData();
data.append("name", "sachin");
console.log(data);
