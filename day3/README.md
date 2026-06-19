# Day 3 Solutions

Both Python and Node.js implementations are provided for Day 3.

## Part 1 (part1.py / part1.js)

Finds the largest pair of batteries from each line in the input file.

- Generates all possible pairs of digits from each line
- Concatenates pairs to form two-digit numbers
- Returns the maximum pair value
- Sums all maximum pairs across all lines

**Usage:**
```bash
# Python
python part1.py

# Node.js
node part1.js
```

## Part 2 (part2.py / part2.js)

Finds the largest group of 12 batteries from each line using a recursive approach.

- Recursively finds the largest battery in a subset
- Builds up a group of size 12 by selecting the largest available batteries
- Concatenates selected batteries as strings
- Sums all largest groups across all lines

**Usage:**
```bash
# Python
python part2.py

# Node.js
node part2.js
```

## Input Files

- `input.txt` - Main puzzle input (large dataset)
- `test-input.txt` - Test input for verification
