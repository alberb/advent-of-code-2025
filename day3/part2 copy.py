def readlines(filename):
    with open(filename, "r") as f:
        return [line.strip() for line in f.readlines()]


def listAllBatteryGroups(bank, size):
    # print(f"Listing all battery groups of size {size} from bank {bank}")
    if size == len(bank):
        # print(f"Yielding {bank}")
        yield bank
    elif size == 1:
        # print("Yielding individual batteries")
        for b in bank:
            yield b
    else:
        # print("Yielding combinations")
        for i in range(len(bank)):
            for nextGroup in listAllBatteryGroups(bank[i+1:], size-1):
                yield bank[i] + nextGroup


def findMaxGroup(line, size):
    groups = list(listAllBatteryGroups(line, size))
    # print(f"Groups: {groups}")
    maxGroup = max(int(group) for group in groups)
    print(f"Max group in line {line} is {maxGroup}")
    return maxGroup






lines = readlines("input.txt")
total = sum(findMaxGroup(line, 12) for line in lines)
print(total);