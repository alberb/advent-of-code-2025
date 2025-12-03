def isValid(number):
    line = str(number)
    if len(line) % 2 != 0:
        return True
    firstHalf = line[:len(line)//2]
    secondHalf = line[len(line)//2:]
    return not firstHalf == secondHalf


def getNumbersFromRanges(file):
    numbers = []
    ranges = file.split(",")
    for r in ranges:
        print(r)
        cleanline = r.strip()
        parts = r.split("-")
        start = int(parts[0])
        end = int(parts[1])
        print(f"Generating numbers from {start} to {end}")
        # for i in range(start, end + 1):
        #     print(i)
        #     numbers.append(i)
        numbers.extend(range(start, end + 1))
    return numbers



# Open the file in read mode and use readlines()
with open("input.txt", "r") as f:
    file = f.read()
    numbers = getNumbersFromRanges(file)
    invalidNumbers = [number for number in numbers if not isValid(number)]
    print(invalidNumbers)
    print(len(invalidNumbers))
    print(sum(invalidNumbers))