// Q1. Intersection of 2 shorted array;

// intersect([1, 2, 2, 3, 4, 4], [2, 2, 4, 5, 5, 6, 2000]);

// output [2,2,4]

let intersect = (arr1, arr2) => {
  let obj = {};
  let resultArr = [];
  for (let i = 0; i < arr1.length; i++) {
    if (obj[arr1[i]]) {
      obj[arr1[i]]++;
    } else {
      obj[arr1[i]] = 1;
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    if (obj[arr2[i]]) {
      if (obj[arr2[i]] > 0) {
        resultArr.push(arr2[i]);
        obj[arr2[i]]--;
      }
    }
  }
  console.log(resultArr);
};

intersect([1, 2, 2, 3, 4, 4], [2, 2, 4, 5, 5, 6, 2000]);
