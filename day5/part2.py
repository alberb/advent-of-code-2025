def readFileAsGrid(filename):
    with open(filename, "r") as f:
        return [list(line.strip()) for line in f.readlines()]
    

def isPaperMoveable(x, y, grid):
    if not hasPaper(x, y, grid):
        return False
    
    adjacentCount = 0

    topLeft = hasPaper(x - 1, y - 1, grid)
    if topLeft:
        adjacentCount += 1
    top = hasPaper(x, y - 1, grid)
    if top:
        adjacentCount += 1
    topRight = hasPaper(x + 1, y - 1, grid)
    if topRight:
        adjacentCount += 1
    left = hasPaper(x - 1, y, grid)
    if left:
        adjacentCount += 1
    right = hasPaper(x + 1, y, grid)
    if right:
        adjacentCount += 1
    bottomLeft = hasPaper(x - 1, y + 1, grid)
    if bottomLeft:
        adjacentCount += 1
    bottom = hasPaper(x, y + 1, grid)
    if bottom:
        adjacentCount += 1
    bottomRight = hasPaper(x + 1, y + 1, grid)
    if bottomRight:
        adjacentCount += 1

    isMoveable =  adjacentCount < 4
    if isMoveable:
        grid[y][x] = "x"
    return isMoveable



def hasPaper(x, y, grid):
    if y < 0 or y >= len(grid):
        return False
    if x < 0 or x >= len(grid[0]):
        return False
    return grid[y][x] == "@"


def findAndMoveRolls(grid):
    moveableCount = 0
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            if isPaperMoveable(x, y, grid):
                print(f"Found moveable paper at ({x}, {y})")
                moveableCount += 1
    return moveableCount

def findAnswer(fileName):
    grid = readFileAsGrid(fileName)
    totalMoveableCount = 0
    canMoveMore = True
    while canMoveMore:
        moveableCount = findAndMoveRolls(grid)
        print(f"Moveable count: {moveableCount}")
        totalMoveableCount += moveableCount
        canMoveMore = moveableCount > 0
    return totalMoveableCount


testAnswer = findAnswer("test.txt")
print(f"Test answer: {testAnswer}")
assert testAnswer == 43


answer = findAnswer("input.txt")
print(f"Answer: {answer}")
