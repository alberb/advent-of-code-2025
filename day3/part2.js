const fs = require('fs');

function readlines(filename) {
  return fs.readFileSync(filename, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function findLargestBatteryIndex(bank) {
  let maxIndex = 0;
  let maxValue = -1;
  for (let i = 0; i < bank.length; i++) {
    const value = parseInt(bank[i]);
    if (value > maxValue) {
      maxValue = value;
      maxIndex = i;
    }
  }
  return maxIndex;
}

function findLargestGroup(bank, size) {
  if (size === 1) {
    return bank[findLargestBatteryIndex(bank)];
  } else if (size === bank.length) {
    return bank;
  } else {
    const nextIndex = findLargestBatteryIndex(bank.slice(0, bank.length + 1 - size));
    const nextBattery = bank[nextIndex];
    const nextGroup = findLargestGroup(bank.slice(nextIndex + 1), size - 1);
    const largestGroup = nextBattery + nextGroup;
    console.log(`Largest group of size ${size} in bank ${bank} is ${largestGroup}`);
    return largestGroup;
  }
}

const lines = readlines('input.txt');
const total = lines.reduce((sum, line) => sum + parseInt(findLargestGroup(line, 12)), 0);
console.log(total);