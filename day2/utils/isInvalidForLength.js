const { chunkList } = require('./chunkList');

/**
 * Checks whether a number is invalid when its digits are divided into
 * chunks of exactly `length` characters.
 *
 * A number is invalid for a given chunk length when:
 *  1. The digit string is evenly divisible by `length`, AND
 *  2. Every chunk is identical to the first chunk.
 *
 * Returns false immediately if the string length is not divisible by `length`.
 *
 * @param {number} num    - The number to test
 * @param {number} length - The chunk size to use
 * @returns {boolean}
 *
 * @example
 * isInvalidForLength(121212, 2); // true  — ['12','12','12'] all equal
 * isInvalidForLength(121213, 2); // false — ['12','12','13'] not all equal
 * isInvalidForLength(1212,   3); // false — 4 not divisible by 3
 */
function isInvalidForLength(num, length) {
  const line = String(num);

  if (line.length % length !== 0) {
    return false;
  }

  const chunks = chunkList(line, length);
  const isInvalid = chunks.every((chunk) => chunk === chunks[0]);

  if (isInvalid) {
    console.log(`Number ${num} is invalid for length ${length}`);
  }

  return isInvalid;
}

module.exports = { isInvalidForLength };
