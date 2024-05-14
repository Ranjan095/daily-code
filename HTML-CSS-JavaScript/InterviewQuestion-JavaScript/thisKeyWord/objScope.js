let obj = {
  helloworld: function () {
    return "hello world" + "_"+this.name;
  },
  name: "Ranjan",
};

let obj2 = {
  helloworld: obj.helloworld,
  name: "Shyam",
};

console.log(obj2.helloworld())
console.log(obj2.helloworld.call(obj))