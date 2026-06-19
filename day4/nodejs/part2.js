const fs = require("fs");
const path = require("path");

/**
 * Reads a file and returns its contents as a 2D grid (array of char arrays).
 * @param {string} filename
 * @returns {string[][]}
 */
function readFileAsGrid(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  return lines
    .filter((line) => line.length > 0)
    .map((line) => line.trimEnd().split(""));
}

/**
 * Returns true if the cell at (x, y) contains a paper marker "@".
 * Returns false if out of bounds.
 * @param {number} x
 * @param {number} y
 * @param {string[][]} grid
 * @returns {boolean}
 */
function hasPaper(x, y, grid) {
  if (y < 0 || y >= grid.length) return false;
  if (x < 0 || x >= grid[0].length) return false;
  return grid[y][x] === "@";
}

/**
 * Returns true if the paper at (x, y) is moveable AND mutates the grid,
 * replacing the "@" with "x" to mark it as consumed.
 * A paper is moveable if it exists AND has fewer than 4 adjacent paper neighbors
 * (checking all 8 surrounding cells).
 * @param {number} x
 * @param {number} y
 * @param {string[][]} grid
 * @returns {boolean}
 */
function isPaperMoveable(x, y, grid) {
  if (!hasPaper(x, y, grid)) return false;

  let adjacentCount = 0;

  if (hasPaper(x - 1, y - 1, grid)) adjacentCount++; // topLeft
  if (hasPaper(x,     y - 1, grid)) adjacentCount++; // top
  if (hasPaper(x + 1, y - 1, grid)) adjacentCount++; // topRight
  if (hasPaper(x - 1, y,     grid)) adjacentCount++; // left
  if (hasPaper(x + 1, y,     grid)) adjacentCount++; // right
  if (hasPaper(x - 1, y + 1, grid)) adjacentCount++; // bottomLeft
  if (hasPaper(x,     y + 1, grid)) adjacentCount++; // bottom
  if (hasPaper(x + 1, y + 1, grid)) adjacentCount++; // bottomRight

  const isMoveable = adjacentCount < 4;
  if (isMoveable) {
    grid[y][x] = "x"; // mark as consumed, same as part2.py
  }
  return isMoveable;
}

/**
 * Performs one pass over the grid, marking and counting all moveable papers.
 * @param {string[][]} grid
 * @returns {number} number of papers marked in this pass
 */
function findAndMoveRolls(grid) {
  let moveableCount = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isPaperMoveable(x, y, grid)) {
        console.log(`Found moveable paper at (${x}, ${y})`);
        moveableCount++;
      }
    }
  }

  return moveableCount;
}

/**
 * Repeatedly finds and marks moveable papers until no more can be moved,
 * accumulating the total count across all iterations.
 * @param {string} fileName  Path relative to day4/ directory
 * @returns {number}
 */
function findAnswer(fileName) {
  const grid = readFileAsGrid(fileName);
  let totalMoveableCount = 0;
  let canMoveMore = true;

  while (canMoveMore) {
    const moveableCount = findAndMoveRolls(grid);
    console.log(`Moveable count: ${moveableCount}`);
    totalMoveableCount += moveableCount;
    canMoveMore = moveableCount > 0;
  }

  return totalMoveableCount;
}

// --- Test ---
const testAnswer = findAnswer("test.txt");
console.log(`Test answer: ${testAnswer}`);
console.assert(testAnswer === 43, `Expected 43 but got ${testAnswer}`);

// --- Main ---
const answer = findAnswer("input.txt");
console.log(`Answer: ${answer}`);
