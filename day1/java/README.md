# Day 1 - Java Implementation

This directory contains Java implementations of the Advent of Code 2025 Day 1 solutions.

## Files

- **Part1.java**: Implements directional movement logic with modulo 100 wrapping and zero-crossing detection
  - Reads from `input.txt`
  - Tracks location starting at position 50
  - Counts how many times location equals 0 after applying modulo 100
  - Processes commands: R (right/add) and L (left/subtract)

- **Part2.java**: Implements extended logic with step-by-step movement
  - Reads from `test-input.txt`
  - Tracks location starting at position 50
  - Counts all zero-crossing occurrences by moving one unit at a time
  - Catches every time location wraps to 0 (modulo 100)
  - Processes commands: R (right/add) and L (left/subtract)

## Compilation

To compile the Java files:

```bash
cd day1/java
javac Part1.java Part2.java
```

## Execution

To run Part1:

```bash
cd day1/java
java Part1
```

To run Part2:

```bash
cd day1/java
java Part2
```

## Logic

### Part1
- Starts at location 50
- For each command, moves in the specified direction by the given distance
- Applies modulo 100 wrapping after each command
- Counts how many times location equals 0

### Part2
- Starts at location 50
- For each command, moves one unit at a time in the specified direction
- Applies modulo 100 wrapping after each step
- Counts every time location equals 0 (catches all zero-crossings)

## Compatibility

These Java implementations are compatible with the Python solutions in the parent directory and produce equivalent results.
