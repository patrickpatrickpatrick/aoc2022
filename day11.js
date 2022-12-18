const fs = require('fs');

const monkeys1 = [];
const monkeys2 = [];

// dont need named groups, makes it easier to read
const horrifyingMonkeyRegex = /.*\:\n.*\: (?<startingList>.*)\n.*\: new = (?<expression>.*)\n.*\:.* (?<divsibleBy>\d+)\n.*(?<trueMonkey>\d+)\n.*(?<falseMonkey>\d+)/;

const throwToMonkey = (monkeys) => (item) => (monkey) => monkeys[monkey].catch(item);

class Monkey {
  constructor(initialList, expression, divisor, testSuccess, testFail, worryDivide, throwToMonkey) {
    this.list = initialList.split(', ').map(x => parseInt(x));
    this.expression = expression;
    this.divisor = parseInt(divisor);
    this.testSuccess = parseInt(testSuccess);
    this.testFail = parseInt(testFail);
    this.itemsInspected = 0;
    this.worryDivide = worryDivide || 1;
    this.throwToMonkey = throwToMonkey;
  }

  keepAway() {
    while (this.list.length) {
      let old = this.list.shift();
      let newVal = eval(this.expression) % allDivisors;

      this.throwToMonkey(newVal)(newVal % this.divisor ? this.testFail : this.testSuccess);

      this.itemsInspected = this.itemsInspected + 1;
    }
  }

  catch(item) {
    this.list.push(item);
  }
}

let allDivisors;

fs.readFile('./day11_input.txt', 'utf8', (err, data) => {
  data.split('\n\n').forEach(monkey => {
    monkeys1.push(new Monkey(
      ...monkey.match(horrifyingMonkeyRegex).slice(1, 6),
      3,
      throwToMonkey(monkeys1),
    ));

    monkeys2.push(new Monkey(
      ...monkey.match(horrifyingMonkeyRegex).slice(1, 6),
      1,
      throwToMonkey(monkeys2),
    ));    
  });
  
  // sorry i cribbed the answer from reddit,
  // didn't know the number theory sorry
  // but it totally makes sense if you see that
  // each of the divisors is a prime number...
  allDivisors = monkeys2.reduce((a, m) => a * m.divisor, 1);

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeys1.length; j++) {
      monkeys1[j].keepAway();
    }
  }

  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < monkeys2.length; j++) {
      monkeys2[j].keepAway();
    }
  }

  console.log(monkeys1.map(y => y.itemsInspected).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1));
  console.log(monkeys2.map(y => y.itemsInspected).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1));
});
