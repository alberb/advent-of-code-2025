const { isInvalid } = require('./utils/isInvalid');
const path = require('path');
const fs = require('fs');

/**
 * Parses a comma-separated string of ranges and returns every integer
 * contained within those ranges.
 *
 * @param {string} fileContent - Raw file content, e.g. "10-15,20-22"
 * @returns {number[]}
 */
function getNumbersFromRanges(fileContent) {
  const numbers = [];
  const ranges = fileContent.trim().split(',');

  for (const r of ranges) {
    const parts = r.trim().split('-');
    const start = parseInt(parts[0], 10);
    const end = parseInt(parts[1], 10);
    console.log(`Generating numbers from ${start} to ${end}`);
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
  }

  return numbers;
}

// ── Main ────────────────────────────────────────────────────────────────────
const inputPath = path.join(__dirname, 'input.txt');
const fileContent = fs.readFileSync(inputPath, 'utf8');

const numbers = getNumbersFromRanges(fileContent);
const invalidNumbers = numbers.filter((n) => isInvalid(n));

console.log(invalidNumbers);
console.log('Count:', invalidNumbers.length);
console.log('Sum:  ', invalidNumbers.reduce((acc, n) => acc + n, 0));
