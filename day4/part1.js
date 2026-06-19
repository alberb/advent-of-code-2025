const fs = require('fs');

function readFileAsGrid(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  return content.split('\n').filter(line => line.trim()).map(line => line.trim().split(''));
}

function hasPaper(x, y, grid) {
  if (y < 0 || y >= grid.length) {
    return false;
  }
  if (x < 0 || x >= grid[0].length) {
    return false;
  }
  return grid[y][x] === '@';
}

function isPaperMoveable(x, y, grid) {
  if (!hasPaper(x, y, grid)) {
    return false;
  }

  let adjacentCount = 0;

  const topLeft = hasPaper(x - 1, y - 1, grid);
  if (topLeft) adjacentCount++;

  const top = hasPaper(x, y - 1, grid);
  if (top) adjacentCount++;

  const topRight = hasPaper(x + 1, y - 1, grid);
  if (topRight) adjacentCount++;

  const left = hasPaper(x - 1, y, grid);
  if (left) adjacentCount++;

  const right = hasPaper(x + 1, y, grid);
  if (right) adjacentCount++;

  const bottomLeft = hasPaper(x - 1, y + 1, grid);
  if (bottomLeft) adjacentCount++;

  const bottom = hasPaper(x, y + 1, grid);
  if (bottom) adjacentCount++;

  const bottomRight = hasPaper(x + 1, y + 1, grid);
  if (bottomRight) adjacentCount++;

  const isMoveable = adjacentCount < 4;
  return isMoveable;
}

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

const testAnswer = findAnswer('test.txt');
console.log(`Test answer: ${testAnswer}`);
if (testAnswer !== 13) {
  throw new Error(`Test assertion failed: expected 13, got ${testAnswer}`);
}

const answer = findAnswer('input.txt');
console.log(`Answer: ${answer}`);
