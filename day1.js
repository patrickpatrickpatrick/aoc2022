var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day1_input.txt')
});

const input = []
let curr = 0

// i guess this yr ill read in the file line-by-line?

lineReader.on('line', function (line) {
	if (!isNaN(parseInt(line))) {
		curr += parseInt(line)
	} else {
		input.push(curr);
		curr = 0;
	}
});

lineReader.on('close', function (line) {
	// part 1
	console.log(input.sort((a, b) => b - a)[0]);

	// part 2
	console.log(input.sort((a, b) => b - a).slice(0, 3).reduce((x, y) => x + y));
});
