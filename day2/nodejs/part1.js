const fs = require('fs');
const path = require('path');

/**
 * A number is invalid if its digit string has even length
 * and the first half equals the second half.
 * Returns true when the number is VALID (i.e. NOT invalid).
 */
function isValid(number) {
  const line = String(number);
  if (line.length % 2 !== 0) {
    return true;
  }
  const mid = Math.floor(line.length / 2);
  const firstHalf = line.slice(0, mid);
  const secondHalf = line.slice(mid);
  return firstHalf !== secondHalf;
}

/**
 * Parses a comma-separated list of ranges (e.g. "100-200,300-400")
 * and returns every integer contained in those ranges.
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
const inputPath = path.join(__dirname, '..', 'input.txt');
const fileContent = fs.readFileSync(inputPath, 'utf8');

const numbers = getNumbersFromRanges(fileContent);
const invalidNumbers = numbers.filter(n => !isValid(n));

console.log('Invalid numbers:', invalidNumbers);
console.log('Count:', invalidNumbers.length);
console.log('Sum:', invalidNumbers.reduce((acc, n) => acc + n, 0));
