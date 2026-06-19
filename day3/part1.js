const fs = require('fs');

function readlines(filename) {
  return fs.readFileSync(filename, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function* listAllBatteryPairs(bank) {
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      yield parseInt(bank[i] + bank[j]);
    }
  }
}

function findMaxPair(line) {
  const pairs = Array.from(listAllBatteryPairs(line));
  const maxPair = Math.max(...pairs);
  console.log(`Max pair in line ${line} is ${maxPair}`);
  return maxPair;
}

const lines = readlines('input.txt');
const total = lines.reduce((sum, line) => sum + findMaxPair(line), 0);
console.log(total);