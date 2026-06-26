"""
Day 1 - Part 2: Zero-Crossing Counter (Step-by-Step Movement)

This script is an enhanced version of Part 1. It simulates the same circular
location tracker (0–99, starting at 50), but instead of jumping the full
distance in one bulk move, it moves ONE STEP AT A TIME.

This step-by-step approach correctly counts EVERY time the location passes
through zero during a move — not just whether it lands on zero at the end.
For example, a move of R200 might cross zero twice; Part 1 would miss both,
but Part 2 catches each crossing individually.

Input format: Each line is a direction and distance, e.g. "R15" or "L30"
"""

# Open the test input file for validation before running on the real input
with open("test-input.txt", "r") as f:
    lines = f.readlines()

# Debug: print all lines to verify the input was read correctly
print(lines)

# Starting position on the circular number line (range: 0–99)
location = 50

# Kept for compatibility with the final print statement (always 0 in this version
# since we never check for a landing-on-zero outside the step loop)
zeroCounter = 0

# Counts every individual step where the location hits exactly 0
# This is the key metric for Part 2 — tracks ALL zero crossings, not just final landings
pastZeroCounter = 0

# Process each movement command one at a time
for line in lines:
    # Save the location before this move (reserved for potential boundary-check logic)
    previousLocation = location
    print(f"Location is currently: {location}")

    # Strip whitespace/newline characters from the line for clean parsing
    cleanline = line.strip()
    print(f"Processing line: {cleanline}")

    # First character is the direction: 'R' (right/increase) or 'L' (left/decrease)
    direction = cleanline[0]

    # Remaining characters form the integer distance to move
    distance = int(cleanline[1:])

    # --- ALTERNATIVE APPROACH (Bulk Math) ---
    # The commented block below was an earlier attempt to calculate zero-crossings
    # mathematically using integer division (distance // 100), without stepping.
    # It was abandoned because it didn't handle edge cases correctly (e.g. landing
    # exactly on 0 vs. passing through 0 mid-move).
    #
    # if direction == "R":
    #     final = distance + location
    #     pastZeroIncrement = final // 100
    #     if pastZeroIncrement > 0:
    #         pastZeroCounter += pastZeroIncrement
    #         print(f"Location went past zero {pastZeroIncrement} times! Total times: {pastZeroCounter}")
    #     location += distance
    # elif direction == "L":
    #     final = abs(location - distance)
    #     pastZeroIncrement = final // 100
    #     if pastZeroIncrement > 0:
    #         pastZeroCounter += pastZeroIncrement
    #         print(f"Location went past zero {pastZeroIncrement} times! Total times: {pastZeroCounter}")
    #     location -= distance

    # --- CURRENT APPROACH: Step-by-step movement ---
    # Move one unit at a time for the full distance. After each step, apply
    # modulo 100 to keep the location on the circular range, then check for zero.
    for i in range(distance):
        if direction == "R":
            location += 1
        elif direction == "L":
            location -= 1

        # Wrap location within 0–99 after every single step
        location = location % 100

        # If we've hit zero on this step, count it as a zero-crossing
        if location == 0:
            pastZeroCounter += 1
            print(f"Location went past zero! Total times: {pastZeroCounter}")

    # --- DISCARDED BOUNDARY-CHECK APPROACHES ---
    # These two blocks attempted to detect zero-crossings by checking if the
    # location went negative or exceeded 100 after a bulk move. They were
    # replaced by the step-by-step loop above, which is simpler and correct.
    #
    # if location < 0 and (previousLocation != 0 or location < -100):
    #     pastZeroCounter += 1 + (abs(location) // 100)
    #     print(f"Location went below zero! Total times: {pastZeroCounter}")
    #
    # if location > 100 and previousLocation != 0:
    #     pastZeroCounter += (abs(location) // 100)
    #     print(f"Location went below zero! Total times: {pastZeroCounter}")
    #
    # location = location % 100
    #
    # if location == 0:
    #     zeroCounter += 1

print(f"Number of times location was zero: {zeroCounter}")
print(f"Number of times location went past zero: {pastZeroCounter}")
print(f"Total: {zeroCounter + pastZeroCounter}")
