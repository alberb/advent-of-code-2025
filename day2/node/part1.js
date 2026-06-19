const fs = require('fs');
const path = require('path');

/**
 * Check if a number is valid
 * A number is valid if it cannot be divided into equal-length chunks that are all identical
 * @param {number} number - The number to check
 * @returns {boolean} - True if valid, false if invalid
 */
function isValid(number) {
  const line = String(number);
  if (line.length % 2 !== 0) {
    return true;
  }
  const firstHalf = line.substring(0, line.length / 2);
  const secondHalf = line.substring(line.length / 2);
  return firstHalf !== secondHalf;
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
    console.log(`Generating numbers from ${start} to ${end}`);
    
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
const invalidNumbers = numbers.filter(number => !isValid(number));

console.log(invalidNumbers);
console.log(invalidNumbers.length);
console.log(invalidNumbers.reduce((sum, num) => sum + num, 0));