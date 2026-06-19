# Day 2 — Node.js Solutions

This directory contains both the original **Python** solutions and a modular **Node.js** port.

---

## Running the Node.js Solutions

> Both scripts read from `input.txt` in this directory. Make sure you are in the `day2/` folder when running them, or Node will not find the file.

```bash
cd day2

# Part 1
node part1.js

# Part 2
node part2.js
```

No external packages are required — only the Node.js standard library (`fs`, `path`).

---

## Module Structure

```
day2/
├── part1.js                   # Entry point for Part 1
├── part2.js                   # Entry point for Part 2
├── utils/
│   ├── isValid.js             # Part 1 validation predicate
│   ├── isInvalid.js           # Part 2 invalidity predicate
│   ├── isInvalidForLength.js  # Checks a single chunk-length hypothesis
│   └── chunkList.js           # Generic string-chunking utility
├── input.txt
└── test-input.txt
```

### Dependency Graph

```
part1.js
└── utils/isValid.js

part2.js
└── utils/isInvalid.js
    └── utils/isInvalidForLength.js
        └── utils/chunkList.js
```

---

## Module API

### `utils/isValid.js`

```js
const { isValid } = require('./utils/isValid');
isValid(1212);  // false — "12" === "12", so the number is INVALID
isValid(1213);  // true  — "12" !== "13", so the number is valid
isValid(123);   // true  — odd length, always valid
```

A number is **invalid** (returns `false`) when its decimal string has an even
length and the first half equals the second half.

---

### `utils/chunkList.js`

```js
const { chunkList } = require('./utils/chunkList');
chunkList('121212', 2); // ['12', '12', '12']
chunkList('abcdef', 3); // ['abc', 'def']
```

Splits a string into equal-sized chunks. If the string length is not evenly
divisible by `size`, the last chunk will be shorter.

---

### `utils/isInvalidForLength.js`

```js
const { isInvalidForLength } = require('./utils/isInvalidForLength');
isInvalidForLength(121212, 2); // true  — ['12','12','12'] all equal
isInvalidForLength(121213, 2); // false — ['12','12','13'] not all equal
isInvalidForLength(1212,   3); // false — 4 not divisible by 3
```

Returns `true` only when the digit string length is divisible by `length`
**and** every chunk is identical to the first.

---

### `utils/isInvalid.js`

```js
const { isInvalid } = require('./utils/isInvalid');
isInvalid(1212);   // true
isInvalid(121212); // true
isInvalid(1234);   // false
```

Iterates chunk lengths from `1` to `floor(digits / 2)` and returns `true` as
soon as any length satisfies `isInvalidForLength`. Uses `Array.some()` for
short-circuit evaluation.

---

## Algorithm Notes

### Part 1 — Half-string comparison

For each number in the input ranges, the string representation is split exactly
in half. If both halves are identical the number is flagged as invalid. Numbers
with an odd number of digits are always valid.

### Part 2 — Repeated-chunk detection

Part 2 generalises Part 1. Instead of only checking whether the string is made
up of exactly two identical halves, it checks every possible chunk size from 1
up to half the string length. A number is invalid if **any** chunk size evenly
divides the string and produces all-identical chunks.

Examples:
| Number   | Chunk size | Chunks              | Invalid? |
|----------|-----------|---------------------|----------|
| `1212`   | 2         | `["12","12"]`        | ✅ yes   |
| `121212` | 2         | `["12","12","12"]`  | ✅ yes   |
| `111`    | 1         | `["1","1","1"]`     | ✅ yes   |
| `1234`   | 1         | `["1","2","3","4"]` | ❌ no    |
| `1234`   | 2         | `["12","34"]`        | ❌ no    |
