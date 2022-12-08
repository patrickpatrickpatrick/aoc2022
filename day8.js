const fs = require('fs');

fs.readFile('./day8_input.txt', 'utf8', (err, grid) => {
  const rows = [...grid.matchAll(/(?<row>[0-9]*)\s/g)];
  const columnLength = [...grid.matchAll(/\n/g)].length;

  let visibleCount = (rows.length * 2) + ((columnLength - 2) * 2);
  let maxScenicScore = 0;

  for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < columnLength - 1; j++) {
      let scenicScore = [];
      const column = [...grid.matchAll(eval(`/.{${j}}(\\d).*\\s/g`))].map(x => x[1]);
      const row = rows[i].groups["row"];

      const directions = [
        column.slice(0, i).reverse().join(''), // up
        column.slice(i + 1, column.length).join(''), // below
        row.slice(0, j).split('').reverse().join(''), // right
        row.slice(j + 1, row.length), // left
      ];

      visibleCount += 1 * !directions.reduce((x, y) => {
          const matchedTree = y.match(eval(`/[${row[j]}-9]/`))
          scenicScore.push(matchedTree ? (matchedTree.index + 1) : (y.length));
          return !!matchedTree && x;
        }, true);

      scenicScore = scenicScore.reduce((x, y) => x * y, 1);
      maxScenicScore = scenicScore > maxScenicScore ? scenicScore : maxScenicScore;
    }
  }
  console.log(visibleCount, maxScenicScore)
})
