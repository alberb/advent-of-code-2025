# Advent of Code 2025 Solutions

Written in Python to gain familiarity

## Updates

> **Update:** Brad made another edit to improve this project.

## Authors

- [alberb](https://github.com/alberb)

## Day 1

**part1.py:** Tracks a location that moves left and right based on directional commands. It counts how many times the location crosses zero (wraps around using modulo 100). The code processes each line as a direction (L/R) and distance, moving one step at a time and checking if it hits zero.

**part2.py:** Tracks a location that moves left and right based on directional commands. It counts how many times the location crosses zero (wraps around using modulo 100). The code processes each line as a direction (L/R) and distance, moving one step at a time and checking if it hits zero.

## Day 2

**part1.py:** Validates numbers within given ranges to find "invalid" numbers. A number is invalid if it can be divided into equal-length chunks that are all identical (e.g., "121212" would be invalid because it's "12" repeated). It reads ranges from a file, generates all numbers in those ranges, filters for invalid ones, and sums them.

**part2.py:** Validates numbers within given ranges to find "invalid" numbers. A number is invalid if it can be divided into equal-length chunks that are all identical (e.g., "121212" would be invalid because it's "12" repeated). It reads ranges from a file, generates all numbers in those ranges, filters for invalid ones, and sums them.

## Day 3

**part1.py:** Finds the largest group of 12 batteries from a bank of batteries. It recursively finds the largest battery in a subset and builds up a group of size 12, summing the values of all lines in the input file.

**part2.py:** Finds the largest group of 12 batteries from a bank of batteries. It recursively finds the largest battery in a subset and builds up a group of size 12, summing the values of all lines in the input file.

## Day 4

**part1.py:** Reads a grid and identifies "moveable paper" (marked with "@"). Paper is moveable if it has fewer than 4 adjacent paper neighbors. The code iteratively finds and marks moveable papers with "x" until no more can be moved, counting the total number of moveables found.

**part2.py:** Reads a grid and identifies "moveable paper" (marked with "@"). Paper is moveable if it has fewer than 4 adjacent paper neighbors. The code iteratively finds and marks moveable papers with "x" until no more can be moved, counting the total number of moveables found.

## Day 5

**part1.py:** Identical to Day 4's part2.py - it performs the same paper/grid movement logic with the same test assertion (expecting answer of 43).

**part2.py:** Identical to Day 4's part2.py - it performs the same paper/grid movement logic with the same test assertion (expecting answer of 43).
