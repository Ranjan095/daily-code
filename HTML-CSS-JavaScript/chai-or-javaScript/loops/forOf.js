let arr=[1,2,3,4,5,6,7,8,9,10];

let sum=0;
let container=[];
for (const val of arr) {
    sum+=val
    container.push(val)
};
console.log(`${container.join(" + ")} = ${sum}`);