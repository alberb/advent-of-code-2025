"""
Day 1 - Part 1: Zero-Crossing Counter (Bulk Movement)

This script simulates a location tracker on a circular number line (0–99).
Starting at position 50, it reads movement commands from an input file and
moves the location left or right by the full distance in one step.

The goal is to count how many times the location lands exactly on zero
after each move, using modulo 100 to wrap around the circular range.

Input format: Each line is a direction and distance, e.g. "R15" or "L30"
"""

# Open the input file and read all movement commands as a list of lines
with open("input.txt", "r") as f:
    lines = f.readlines()

# Debug: print all lines to verify the input was read correctly
print(lines)

# Starting position on the circular number line (range: 0–99)
location = 50

# Counts how many times the location lands exactly on 0 after a move
zeroCounter = 0

# Process each movement command one at a time
for line in lines:
    print(f"Location is currently: {location}")

    # Strip whitespace/newline characters from the line for clean parsing
    cleanline = line.strip()
    print(f"Processing line: {cleanline}")

    # First character is the direction: 'R' (right/increase) or 'L' (left/decrease)
    direction = cleanline[0]

    # Remaining characters form the integer distance to move
    distance = int(cleanline[1:])

    # Apply the full movement in one step (bulk movement — contrast with Part 2)
    if direction == "R":
        location += distance
    elif direction == "L":
        location -= distance

    # Wrap the location within the 0–99 range using modulo 100.
    # This creates a circular number line: going past 99 wraps back to 0,
    # and going below 0 wraps around to 99.
    location = location % 100

    # Check if the location landed exactly on zero after this move
    if location == 0:
        zeroCounter += 1

print(f"Number of times location was zero: {zeroCounter}")
