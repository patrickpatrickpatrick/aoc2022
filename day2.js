var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day2_input.txt')
});

let curr = 0

const scores = {
	"B X": 0,
	"C Y": 0,
	"A Z": 0,
	"A X": 3,
	"B Y": 3,
	"C Z": 3,
	"C X": 6,
	"A Y": 6,
	"B Z": 6,
};

lineReader.on('line', function (line) {
	curr += scores[line];
	curr += (((Object.keys(scores).findIndex(x => x == line)) % 3) + 1)
});

lineReader.on('close', function (line) {
	// part 1
	console.log(curr);
});
