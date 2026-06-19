/**
 * Splits a string into an array of equal-sized chunks.
 *
 * If the string length is not evenly divisible by `size`, the final chunk
 * will be shorter than the others.
 *
 * @param {string} str  - The string to split
 * @param {number} size - The desired chunk length (must be >= 1)
 * @returns {string[]}  Array of chunks
 *
 * @example
 * chunkList('121212', 2); // ['12', '12', '12']
 * chunkList('abcdef', 3); // ['abc', 'def']
 */
function chunkList(str, size) {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

module.exports = { chunkList };
