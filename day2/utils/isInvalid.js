const { isInvalidForLength } = require('./isInvalidForLength');

/**
 * Determines whether a number is "invalid" under the Part 2 rules.
 *
 * A number is invalid if its digit string can be divided into equal-length
 * chunks of ANY length (from 1 up to half the string length) such that all
 * chunks are identical.
 *
 * Uses short-circuit evaluation via `Array.some()` — stops as soon as the
 * first matching chunk length is found.
 *
 * @param {number} num
 * @returns {boolean}
 *
 * @example
 * isInvalid(1212);   // true  — repeats "12" twice
 * isInvalid(121212); // true  — repeats "12" three times (or "121212" once)
 * isInvalid(1234);   // false — no repeated chunk pattern
 */
function isInvalid(num) {
  const line = String(num);
  const maxLength = Math.floor(line.length / 2);

  const invalid = Array.from({ length: maxLength }, (_, i) => i + 1)
    .some((length) => isInvalidForLength(num, length));

  if (invalid) {
    console.log(`Number ${num} is invalid`);
  }

  return invalid;
}

module.exports = { isInvalid };
