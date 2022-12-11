var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day10_input.txt')
});

let i = 0, cycles = 1, register = 1;
const keyCycles = new Set([20, 60, 100, 140, 180, 220]);
const results = [];
const rows = [];

const checkAndIncrementCycle = (registerValue, line) => {
  const modCycles = cycles % 40 > 0 ? cycles % 40 : 40;

  if (
    ((modCycles - 1) >= register - 1) &&
    ((modCycles - 1) <= register + 1)
  ) {
    process.stdout.write("#");
  } else {
    process.stdout.write(".");
  }

  if (cycles % 40 == 0) {
   process.stdout.write("\n"); 
  }

  if (keyCycles.has(cycles)) {
    results.push(registerValue * cycles);
  }

  cycles += 1;
}

lineReader.on('line', function (line) {
  if (line.match(/noop/)) {
    checkAndIncrementCycle(register, line);
  } else if (line.match(/add/)) {
    const { number } = line.match(/add(?<register>[a-z])\s(?<number>.*)/).groups;

    checkAndIncrementCycle(register, line);
    checkAndIncrementCycle(register, line);    
    register = register + parseInt(number);
  }
});

lineReader.on('close', function (line) {
  console.log(results.reduce((x, y) => x + y, 0)); 
});
