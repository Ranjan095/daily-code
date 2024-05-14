let Calculator = function () {
  this.totalValue = 0;

  this.thousand = function (value) {
    this.totalValue += value * 1000;
    return this;
  };

  this.carore = function (value) {
    this.totalValue += value * 10000000;
    return this;
  };

  this.hundred = function (value) {
    this.totalValue += value * 100;
    return this;
  };
  this.value = function () {
    return this.totalValue;
  };

  return this;
};

let compute = Calculator();
// value.thousand(1).hundred(1)

console.log(compute.thousand(1).carore(1).hundred(1).carore(2).value());
