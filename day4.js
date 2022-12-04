var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day4_input.txt')
});

curr1 = 0;
curr2 = 0;

lineReader.on('line', function (line) {
  const input = line.match(/(\d+)\-(\d+)\,(\d+)\-(\d+)/);
  const reduceFunction = (list, bool) => eval(
    `(y, x) => ((x >= list[0]) && (x <= list[1])) ${bool} y`);

  const firstPair = (input.slice(1, 3)).map(x => parseInt(x));
  const secondPair = (input.slice(3, 5)).map(x => parseInt(x));

  curr1 = curr1 + (
          firstPair.reduce(reduceFunction(secondPair, "&&"), true) ||
          secondPair.reduce(reduceFunction(firstPair, "&&"), true) * 1
        );

  curr2 = curr2 + (
          firstPair.reduce(reduceFunction(secondPair, "||"), false) ||
          secondPair.reduce(reduceFunction(firstPair, "||"), false) * 1
        );
});

lineReader.on('close', () => {
  console.log(curr1)
  console.log(curr2)
});
