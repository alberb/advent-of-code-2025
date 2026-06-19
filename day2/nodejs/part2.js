const fs = require('fs');
const path = require('path');

/**
 * Yields successive n-sized chunks from a string.
 * Mirrors Python's chunk_list generator.
 */
function* chunkList(str, n) {
  for (let i = 0; i < str.length; i += n) {
    yield str.slice(i, i + n);
  }
}

/**
 * Returns true when the number's digit string consists entirely of a single
 * repeated chunk of the given length.
 */
function isInvalidForLength(number, length) {
  const line = String(number);
  if (line.length % length !== 0) {
    return false;
  }
  const chunks = [...chunkList(line, length)];
  const allSame = chunks.every(chunk => chunk === chunks[0]);
  if (allSame) {
    console.log(`Number ${number} is invalid for length ${length}`);
  }
  return allSame;
}

/**
 * A number is invalid if there exists ANY chunk length (1 … len/2) for which
 * the digit string is just that chunk repeated.
 */
function isInvalid(number) {
  const line = String(number);
  const maxLen = Math.floor(line.length / 2);
  const invalid = Array.from({ length: maxLen }, (_, i) => i + 1)
    .some(length => isInvalidForLength(number, length));
  if (invalid) {
    console.log(`Number ${number} is invalid`);
  }
  return invalid;
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
const invalidNumbers = numbers.filter(n => isInvalid(n));

console.log('Invalid numbers:', invalidNumbers);
console.log('Count:', invalidNumbers.length);
console.log('Sum:', invalidNumbers.reduce((acc, n) => acc + n, 0));
