var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day4_input.txt')
});

curr = 0;

lineReader.on('line', function (line) {
  const input = line.match(/(\d+)\-(\d+)\,(\d+)\-(\d+)/);
  const reduceFunction = list => (y, x) => ((x >= list[0]) && (x <= list[1])) && y;

  const firstPair = (input.slice(1, 3)).map(x => parseInt(x));
  const secondPair = (input.slice(3, 5)).map(x => parseInt(x));

  curr = curr + (
          firstPair.reduce(reduceFunction(secondPair), true) ||
          secondPair.reduce(reduceFunction(firstPair), true) * 1
        );
});

lineReader.on('close', () => {
  console.log(curr)
});
