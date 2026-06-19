# Day 2 — Node.js Solutions

This directory contains Node.js ports of the Day 2 Python solutions.

## Problem Summary

Both parts read a comma-separated list of numeric ranges from `../input.txt`,
generate every integer in those ranges, and filter for **invalid** numbers.

| Part | Invalidity Rule |
|------|-----------------|
| Part 1 | A number is invalid if its digit string has even length **and** the first half equals the second half (e.g. `1212` → `12 == 12`). |
| Part 2 | A number is invalid if its digit string can be split into equal-length chunks that are **all identical**, for *any* valid chunk length (e.g. `121212` → chunk `12` repeated three times). |

Both scripts print:
1. The list of invalid numbers
2. The count of invalid numbers
3. The sum of invalid numbers

## Prerequisites

- **Node.js** v14 or later (no external packages required — uses only the built-in `fs` module)

## Running the Solutions

From the `day2/nodejs/` directory:

```bash
# Part 1
node part1.js
# or
npm run part1

# Part 2
node part2.js
# or
npm run part2

# Run both sequentially
npm start
```

## File Structure

```
day2/
├── input.txt          ← shared puzzle input (read by both parts)
├── test-input.txt     ← sample input for manual testing
├── part1.py           ← original Python solution
├── part2.py           ← original Python solution
└── nodejs/
    ├── part1.js       ← Node.js port of part1.py
    ├── part2.js       ← Node.js port of part2.py
    ├── package.json   ← npm project config & run scripts
    └── README.md      ← this file
```

## Implementation Notes

- Both files use only Node.js built-in modules (`fs`, `path`) — no `npm install` needed.
- `part1.js` mirrors the `isValid()` / `getNumbersFromRanges()` logic from `part1.py`.
- `part2.js` mirrors `isInvalid()`, `isInvalidForLength()`, `chunkList()` (a generator using `function*`), and `getNumbersFromRanges()` from `part2.py`.
- Input is resolved relative to the script location via `path.join(__dirname, '..', 'input.txt')`, so the script can be run from any working directory.
