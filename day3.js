var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day3_input.txt')
});

let curr1 = 0;
let curr2 = 0;

let curr2tmp = ""
let j = 0;
let x = 0;

lineReader.on('line', function (line) {

  // maybe there's a way to do this with one regex...
  // my regex is rusty :(
  const regex = /([a-zA-Z])(?=\w*\|\w*\1\w*)/;
  const regex2 = /([a-zA-Z])(?=\w*\|\w*\1\w*\|\w*\1\w*)/;

  // the lower case and upper case are swapped in value
  // from where they are in the ascii table
  const getScoreFromChar = char => (char.toLowerCase().charCodeAt(0) - 96) + (char.toLowerCase() !== char ? 26 : 0);

  // I could have not used the regex special character |
  // as a seperator, whoops (see line 15)
  const tmp = line.slice(0, line.length / 2) + "|" + line.slice(line.length / 2);
  curr1 += getScoreFromChar(tmp.match(regex)[0]);

  curr2tmp = curr2tmp + line + "|";
  j++;

  if (j == 3) {
    j = 0;
    curr2 += getScoreFromChar(curr2tmp.match(regex2)[0]);
    curr2tmp = "";
  }
});

lineReader.on('close', () => {
  // pt 1
  console.log(curr1);

  // pt 2
  console.log(curr2);
});
