const fs = require('fs');
const path = require('path');

/**
 * Check if a number is invalid
 * A number is invalid if it can be divided into equal-length chunks that are all identical
 * @param {number} number - The number to check
 * @returns {boolean} - True if invalid, false if valid
 */
function isInvalid(number) {
  const line = String(number);
  const isInvalidFlag = Array.from({ length: Math.floor(line.length / 2) }, (_, i) => i + 1)
    .some(length => isInvalidForLength(number, length));
  
  if (isInvalidFlag) {
    console.log(`Number ${number} is invalid`);
  }
  return isInvalidFlag;
}

/**
 * Check if a number is invalid for a specific chunk length
 * @param {number} number - The number to check
 * @param {number} length - The chunk length
 * @returns {boolean} - True if invalid for this length, false otherwise
 */
function isInvalidForLength(number, length) {
  const line = String(number);
  if (line.length % length !== 0) {
    return false;
  }
  
  const chunks = chunkString(line, length);
  const isInvalidFlag = chunks.every(chunk => chunk === chunks[0]);
  
  if (isInvalidFlag) {
    console.log(`Number ${number} is invalid for length ${length}`);
  }
  return isInvalidFlag;
}

/**
 * Split a string into chunks of specified length
 * @param {string} str - The string to chunk
 * @param {number} n - The chunk size
 * @returns {string[]} - Array of chunks
 */
function chunkString(str, n) {
  const chunks = [];
  for (let i = 0; i < str.length; i += n) {
    chunks.push(str.substring(i, i + n));
  }
  return chunks;
}

/**
 * Parse ranges from file content and generate all numbers in those ranges
 * @param {string} fileContent - The file content containing comma-separated ranges
 * @returns {number[]} - Array of all numbers from all ranges
 */
function getNumbersFromRanges(fileContent) {
  const numbers = [];
  const ranges = fileContent.split(',');
  
  for (const r of ranges) {
    console.log(r);
    const cleanLine = r.trim();
    const parts = r.split('-');
    const start = parseInt(parts[0], 10);
    const end = parseInt(parts[1], 10);
    
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
  }
  
  return numbers;
}

// Main execution
const filePath = path.join(__dirname, 'input.txt');
const fileContent = fs.readFileSync(filePath, 'utf8');
const numbers = getNumbersFromRanges(fileContent);
const invalidNumbers = numbers.filter(number => isInvalid(number));

console.log(invalidNumbers);
console.log(invalidNumbers.length);
console.log(invalidNumbers.reduce((sum, num) => sum + num, 0));