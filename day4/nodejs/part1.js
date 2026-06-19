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
 * Returns true if the paper at (x, y) is moveable.
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

  return adjacentCount < 4;
}

/**
 * Reads the grid from the given file and counts all moveable papers in a
 * single pass (no mutation — mirrors part1.py behaviour).
 * @param {string} fileName  Path relative to day4/ directory
 * @returns {number}
 */
function findAnswer(fileName) {
  const grid = readFileAsGrid(fileName);
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

// --- Test ---
const testAnswer = findAnswer("test.txt");
console.log(`Test answer: ${testAnswer}`);
console.assert(testAnswer === 13, `Expected 13 but got ${testAnswer}`);

// --- Main ---
const answer = findAnswer("input.txt");
console.log(`Answer: ${answer}`);
