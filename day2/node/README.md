# Day 2 - Node.js Solutions

Node.js implementations of the Day 2 Advent of Code 2025 solutions.

## Overview

These solutions validate numbers within given ranges to find "invalid" numbers. A number is invalid if it can be divided into equal-length chunks that are all identical (e.g., "121212" would be invalid because it's "12" repeated).

## Part 1

**part1.js:** Simpler validation that only checks if the number can be split into two equal halves that are identical.

## Part 2

**part2.js:** More comprehensive validation that checks all possible chunk lengths from 1 to half the number's length.

## Running the Solutions

```bash
# Run part 1
node part1.js

# Run part 2
node part2.js

# Or use npm scripts
npm run part1
npm run part2
```

## Input Format

The input file should contain comma-separated ranges in the format: `start-end,start-end,...`

Example:
```
11-22,95-115,998-1012
```

## Output

Both scripts output:
1. Array of invalid numbers found
2. Count of invalid numbers
3. Sum of all invalid numbers
