# Open the file in read mode and use readlines()
with open("input.txt", "r") as f:
    lines = f.readlines()


# Print the list of lines
print(lines)

location = 50

zeroCounter = 0


# You can then iterate through the list to process each line
for line in lines:
    print(f"Location is currently: {location}")
    cleanline = line.strip()
    print(f"Processing line: {cleanline}")
    direction = cleanline[0]
    distance = int(cleanline[1:])

    if direction == "R":
        location += distance
    elif direction == "L":
        location -= distance

    location = location % 100

    if location == 0:
        zeroCounter += 1

 
print(f"Number of times location was zero: {zeroCounter}")