var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day6_input.txt')
});

lineReader.on('line', function (line) {
  const regexMaker = (numberOfChars) => {
    let regex = "/";
    for (let i = 1; i < numberOfChars; i++) {
      regex += "([a-z])(?!"
      const groups = [];
      for (let j = 0; j < i; j++) {
        groups.push(`\\${j + 1}`);
      }
      regex += `${groups.join("|")})`
    } 
    return regex + "([a-z])/";
  }

  console.log(regexMaker(14));

  const match = line.match(eval(regexMaker(4)));
  const match2 = line.match(eval(regexMaker(14)));
  console.log(match.index + 4, match2.index + 14);
});

// three line solution

// const match = line.match(/([a-z])(?!\1)([a-z])(?!\1|\2)([a-z])(?!\1|\2|\3)([a-z])/)
// const match2 = line.match(/([a-z])(?!\1)([a-z])(?!\1|\2)([a-z])(?!\1|\2|\3)([a-z])(?!\1|\2|\3|\4)([a-z])(?!\1|\2|\3|\4|\5)([a-z])(?!\1|\2|\3|\4|\5|\6)([a-z])(?!\1|\2|\3|\4|\5|\6|\7)([a-z])(?!\1|\2|\3|\4|\5|\6|\7|\8)([a-z])(?!\1|\2|\3|\4|\5|\6|\7|\8|\9)([a-z])(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10)([a-z])(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11)([a-z])(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12)([a-z])(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12|\13)([a-z])/)
// console.log(match.index + 4, match2.index + 14);
