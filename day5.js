const fs = require('fs');

fs.readFile('./day5_input.txt', 'utf8', (err, data) => {
  let lines, instructions;
  [ lines, instructions ] = data.split("\n\n");
  lines = lines
          .split('\n')
          .slice(0, lines.length - 1)
          .map(x => x + " ");

  // each column is 4 characters
  // there are no delimiters so this
  // magic number is fine?
  const MAGIC_COLUMN_NUMBER = 4;

  const numberOfColumns = lines[0].length / MAGIC_COLUMN_NUMBER;

  let offset = 0;
  let stacks = new Array(numberOfColumns).fill([]);

  const stackMaker = (stack) => {
    if (!stack.length) {
      offset = 0;
      return;
    }

    if (stack.match(/^(\s{2,})(.*)/)) { // if white space at the start of the string is more than 1
      const { whiteSpace, remaining } = stack.match(/(?<whiteSpace>\s{2,})(?<remaining>.*)/).groups;
      offset += (whiteSpace.length / 4); // add to offset number of columns
      return stackMaker(remaining);  // call this function again without those columns
    }

    if (stack.match(/(\[\w\]\s)(.*)/)) { // if there's a box
      const { box, remaining } = stack.match(/\[(?<box>\w)\]\s(?<remaining>.*)/).groups;
      stacks[offset] = [ box, ...stacks[offset] ];
      offset += 1; // add one to the offset
      return stackMaker(remaining); // call this function again without the box added
    }
  }
  
  lines.forEach(l => stackMaker(l));
  stacks2 = JSON.parse(JSON.stringify(stacks));  

  instructions.split('\n').forEach((i) => {
    if (i.length) {
      const { amount, from, to } = i.match(/(?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/).groups

      // pt1
      const loopLength = (stacks[from - 1].length - amount) < 0 ? stacks[from - 1].length : amount
      
      for (let j = 0; j < loopLength; j++) {
        stacks[to - 1].push(stacks[from - 1].pop());
      }

      //pt2
      stacks2[to - 1].push(...stacks2[from - 1].splice(-loopLength));
    }
  });

  // pt1
  console.log(stacks.map(x => x.pop()).reduce((x, y) => x + y, ""))

  // pt2
  console.log(stacks2.map(x => x.pop()).reduce((x, y) => x + y, ""))
});
