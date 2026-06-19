# Day 4 — Node.js Implementation

This directory contains Node.js ports of the Python solutions for Day 4.

## Files

| File | Description |
|------|-------------|
| `part1.js` | Single-pass count of all moveable papers |
| `part2.js` | Iterative removal of moveable papers until none remain |

## How to Run

From the **repository root** (or any directory), run:

```bash
node day4/nodejs/part1.js
node day4/nodejs/part2.js
```

No dependencies — uses only Node.js built-ins (`fs`, `path`).

## Logic Overview

### Shared helpers (both files)

- **`readFileAsGrid(filename)`** — reads a file relative to `day4/` and returns a `string[][]` (2D array of characters). Uses `fs.readFileSync` for simplicity.
- **`hasPaper(x, y, grid)`** — returns `true` if the cell at `(x, y)` is within bounds and equals `"@"`. Returns `false` for out-of-bounds coordinates.
- **`isPaperMoveable(x, y, grid)`** — returns `true` if the cell contains paper **and** has fewer than 4 adjacent paper neighbors (all 8 directions checked).

### part1.js

Performs a **single pass** over the grid, counting every cell where `isPaperMoveable` returns `true`. The grid is **not mutated**.

Asserts the test input produces **13**.

### part2.js

`isPaperMoveable` now **mutates** the grid, replacing `"@"` with `"x"` when a paper is found to be moveable. This mirrors the Python behaviour exactly.

`findAndMoveRolls` performs one full pass, and `findAnswer` loops until a pass finds zero moveable papers, accumulating the total across all iterations.

Asserts the test input produces **43**.

## Differences from Python

| Concern | Python | Node.js |
|---------|--------|---------|
| File I/O | `open()` context manager | `fs.readFileSync()` |
| Grid row | `list(line.strip())` | `line.trimEnd().split("")` |
| Assertions | `assert expr` (raises `AssertionError`) | `console.assert(expr, msg)` (logs warning) |
| Printing | `print(f"...")` | `` console.log(`...`) `` |
| Loop style | `for y in range(len(grid))` | `for (let y = 0; y < grid.length; y++)` |
