class Calculator {
  constructor() {
   thist.totalValue = 0;
  }

  static thousand = function (value) {
    totalValue += value * 1000;
  };

  static carore = function (value) {
    totalValue += value * 10000000;
  };

  static hundred = function (value) {
    totalValue += value * 100;
  };
  static value = function () {
    return totalValue;
  };
}

let compute = new Calculator();
// value.thousand(1).hundred(1)

console.log(new Calculator.thousand(1).carore(1).hundred(1).carore(2).value());
