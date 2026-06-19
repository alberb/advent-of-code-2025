/**
 * Determines whether a number is "valid".
 *
 * A number is considered INVALID when its decimal string representation has
 * an even length AND the first half of the string equals the second half
 * (e.g. 1212 → "12" === "12" → invalid).
 *
 * This function returns TRUE when the number does NOT meet that condition.
 *
 * @param {number} num
 * @returns {boolean} true if the number is valid, false if it is invalid
 */
function isValid(num) {
  const line = String(num);

  // Odd-length strings can never be split into two equal halves → always valid
  if (line.length % 2 !== 0) {
    return true;
  }

  const mid = line.length / 2;
  const firstHalf = line.slice(0, mid);
  const secondHalf = line.slice(mid);

  return firstHalf !== secondHalf;
}

module.exports = { isValid };
