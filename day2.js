var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day2_input.txt')
});

let curr1 = 0
let curr2 = 0

const scores = {
	"B X": 0,
	"C Y": 0, // - or could just make these the actual scores
	"A Z": 0, //   don't really need to mod 3 of the index but
	"A X": 3, //   that makes it more interesting lol
	"B Y": 3, // - or could not use an object at all and just use
	"C Z": 3, //   an array since could just use the indexes of
	"C X": 6, //   the array (again wanted to be more interesting)
	"A Y": 6,
	"B Z": 6,
};

const scores2 = {
	"B X": 0,
	"C X": 0,	// - or could just make these the actual scores
	"A X": 0,	//   don't really need to mod 3 of the index but
	"A Y": 3,	//   that makes it more interesting lol
	"B Y": 3,	// - or could not use an object at all and just use
	"C Y": 3,	//   an array since could just use the indexes of
	"C Z": 6,	//   the array (again wanted to be more interesting)
	"A Z": 6,
	"B Z": 6,
}

lineReader.on('line', function (line) {
	// fine here's a util function to tidy it slightly
	const getScore = (line, list) => ((Object.keys(list).findIndex(x => x == line)) % 3) + 1

	curr1 += scores[line];
	curr1 += getScore(line, scores);

	curr2 += scores2[line];
	curr2 += getScore(line, scores2);
});

lineReader.on('close', function (line) {
	// part 1
	console.log(curr1);
	// part 2
	console.log(curr2);
});
