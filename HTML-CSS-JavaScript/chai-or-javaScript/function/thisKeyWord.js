/** @format */
// let name = "myName";
// let obj = {
//     name: "ranjan",
//     age: 25,
//     city: "Delhi",
//   getName: function () {
//     console.log('line8',this);
//   },
// };
// obj.getName();
// console.log('line12',this);

// /********************************** */

// function thisKeyWord1() {
//   let userName = "ranjan";
//   console.log("line18",this);
// }
// thisKeyWord1();

// let thisKeyWord2 = () => {
//   console.log("line23",this);
// };
// thisKeyWord2();

// /**************************** */

let aerrowFunction = (num1, num2) => ({ name: "ranjan" });

console.log(aerrowFunction(10, 20));

// /**************************** */
