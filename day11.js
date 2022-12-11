// i dont think i need the regex to be this hard
// the operations can be probably just eval'd
node.match(/.*(?<monkeyId>\d+)\:\n.*\: (?<startingItems>.*)\n.*\: (\w+)\s\=\s(.+) (.) (.*)\n.*\: (\S+) (\S+) (\S*)\n/)
