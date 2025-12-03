def readlines(filename):
    with open(filename, "r") as f:
        return [line.strip() for line in f.readlines()]
    


def findLargestBatteryIndex(bank):
    maxIndex = 0
    maxValue = -1
    for i in range(len(bank)):
        value = int(bank[i])
        if value > maxValue:
            maxValue = value
            maxIndex = i
    return maxIndex


def findLargestGroup(bank, size):
    if size == 1:
        return bank[findLargestBatteryIndex(bank)]
    elif size == len(bank):
        return bank
    else:
        nextIndex = findLargestBatteryIndex(bank[0:len(bank)+1-size] )
        nextBattery = bank[nextIndex]
        nextGroup = findLargestGroup(bank[nextIndex+1:], size-1)
        largestGroup =  nextBattery + nextGroup
        print(f"Largest group of size {size} in bank {bank} is {largestGroup}")
        return largestGroup


lines = readlines("input.txt")
# total = sum(findMaxGroup(line, 12) for line in lines)
total = sum(int(findLargestGroup(line, 12)) for line in lines)
print(total);