def readlines(filename):
    with open(filename, "r") as f:
        return [line.strip() for line in f.readlines()]
    

def listAllBatteryPairs(bank):
    for i in range(len(bank)):
        for j in range(i + 1, len(bank)):
            yield int(bank[i] + bank[j])


def findMaxPair(line):
    pairs = list(listAllBatteryPairs(line))
    maxPair = max(pairs)
    print(f"Max pair in line {line} is {maxPair}")
    return maxPair



lines = readlines("input.txt")
total = sum(findMaxPair(line) for line in lines)
print(total);