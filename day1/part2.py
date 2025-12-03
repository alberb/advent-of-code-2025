# Open the file in read mode and use readlines()
with open("test-input.txt", "r") as f:
    lines = f.readlines()


# Print the list of lines
print(lines)

location = 50

zeroCounter = 0

pastZeroCounter = 0


# You can then iterate through the list to process each line
for line in lines:
    previousLocation = location
    print(f"Location is currently: {location}")
    cleanline = line.strip()
    print(f"Processing line: {cleanline}")
    direction = cleanline[0]
    distance = int(cleanline[1:])

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


    for i in range(distance):
        if direction == "R":
            location += 1
        elif direction == "L":
            location -= 1

        location = location % 100

        if location == 0:
            pastZeroCounter += 1
            print(f"Location went past zero! Total times: {pastZeroCounter}")

    # if location < 0 and (previousLocation != 0 or location < -100):
    #     pastZeroCounter += 1 + (abs(location) // 100)
    #     print(f"Location went below zero! Total times: {pastZeroCounter}")


    # if location > 100 and previousLocation != 0:
    #     pastZeroCounter += (abs(location) // 100)
    #     print(f"Location went below zero! Total times: {pastZeroCounter}")

    # location = location % 100

    # if location == 0:
    #     zeroCounter += 1

 
print(f"Number of times location was zero: {zeroCounter}")
print(f"Number of times location went past zero: {pastZeroCounter}")
print(f"Total: {zeroCounter + pastZeroCounter}")