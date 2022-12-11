var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day7_input.txt')
});

let H = {
  x: 0,
  y: 0,
}
let T = {
  x: 0,
  y: 0,
}
let cordsOfT = [];

// L H[0] + 1
// R H[0] - 1
// U H[1] + 1
// D H[1] - 1

// TOUCHING

// T H or T H
// same y, H[x] - 1 or H[x] + 1

// T H
// H T
// same x, H[y] - 1 or H[y] + 1

// T .
// . H
// H[y] + 1, H[x] - 1,

// H .
// . T
// H[y] - 1, H[x] + 1,

const isItTouching() = () => {
  if 
}

lineReader.on('line', function (line) {
  const { dir, dist } = line.match(/(?<dir>R|U|L|D) (?<dist>\d+)/).groups;

  if (dir == "U") {
    while (H.y !== H.y + parseInt(dist)) {
      H.y = H.y + 1;

    }
  } else if (dir == "D") {
    while (H.y !== H.y - parseInt(dist)) {
      H.y = H.y - 1;
    }
  } else if (dir == "R") {
    while (H.x !== H.x + parseInt(dist)) {
      H.x = H.x + 1;
    }
  } else if (dir == "L") {
    while (H.x !== H.x - parseInt(dist)) {
      H.x = H.x - 1;
    }
  }

})

lineReader.on('close', () => {

})
