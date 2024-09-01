// Bubble sort;

let arr = [5, 4, 8, 1, 0, 5, 7, 9];

/** using inbuild sort */
// let sortedArr= arr.sort((a,b)=>a-b);
// console.log(sortedArr)

/** bubbleSort */
// for (let i = 0; i < arr.length; i++) {
//   for (let j = 0; j < arr.length - i - 1; j++) {
//     if (arr[j] > arr[j + 1]) {
//       let temp = arr[j];
//       arr[j] = arr[j + 1];
//       arr[j + 1] = temp;
//     }
//   }
// }
// console.log(arr);

/** Selection sort */
for (let i = 0; i < arr.length - 1; i++) {
  let min = i;
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[min] > arr[j]) {
      min = j;
    }
  }
  let temp = arr[i];
  arr[i] = arr[min];
  arr[min] = temp;
}

console.log(arr);
