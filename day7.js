var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day7_input.txt')
});

const entireDirectory = {};
const currentDirectory = [];

lineReader.on('line', function (line) {
  const cmdMatch = line.match(/\$ (?<cmd>[a-z]{2})/);
  const cmd = cmdMatch ? cmdMatch.groups.cmd : null;

  switch(cmd) {
    case "cd":
      const { folder } = line.match(/\$ cd (?<folder>.*)$/).groups;
      if (folder == "..") {
        currentDirectory.pop(folder);
      } else {
        currentDirectory.push(folder);
      }
      break;
    case "ls":
      entireDirectory[currentDirectory.join("/")] = [];
      break;
    default:
      const fileSize = line.match(/(?<fileSize>\d*).*/);
      const dir = line.match(/dir (?<folder>.*)/);
      entireDirectory[currentDirectory.join("/")].push(
        dir ? currentDirectory.join("/") + `\/${dir.groups.folder}` : parseInt(fileSize.groups.fileSize)
      );
  }
})

let treeClimber = (acc, arr) => {
  const input = arr.pop();

  if (!input) {
    return acc;
  }

  if (!isNaN(input)) {
    acc += input;
  } else {
    acc += treeClimber(0, [...entireDirectory[input]]);
  }

  return treeClimber(acc, arr);
}

lineReader.on('close', () => {
  let diskSpace = 70000000;
  let updateSize = 30000000
  let usedSpace, spaceToFree;
  let candidateDirectory;

  calc = Object.keys(entireDirectory).map((key) => {
    const tmp = treeClimber(0, [...entireDirectory[key]])

    if (key == '/') {
      usedSpace = tmp;
      spaceToFree = updateSize - (diskSpace - usedSpace);
      candidateDirectory = tmp;
    }

    if (tmp >= spaceToFree && tmp < candidateDirectory) {
      candidateDirectory = tmp;
    }

    return tmp > 100000 ? 0 : tmp;
  })
  
  console.log(calc.reduce((x, y) => x + y, 0));
  console.log(candidateDirectory);
})
