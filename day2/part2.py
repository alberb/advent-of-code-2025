def isInvalid(number):
    # print(f"Checking number {number}")
    line = str(number)
    # print(f"Length of number is {len(line)}")
    # print(f"Checking lengths from 1 to {len(line)//2}")
    isInvalid = any(isInvalidForLength(number, length) for length in range(1, len(line)//2 + 1))
    if isInvalid: print(f"Number {number} is invalid")
    return isInvalid


def isInvalidForLength(number, length):
    # print(f"Checking number {number} for length {length}")
    line = str(number)
    if len(line) % length != 0:
        return False
    
    chunks = list(chunk_list(line, length))
    # print(f"Chunks: {chunks}")
    isInvalid = all(chunk == chunks[0] for chunk in chunks)
    if isInvalid: print(f"Number {number} is invalid for length {length}")
    return isInvalid






def chunk_list(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]




def getNumbersFromRanges(file):
    numbers = []
    ranges = file.split(",")
    for r in ranges:
        print(r)
        cleanline = r.strip()
        parts = r.split("-")
        start = int(parts[0])
        end = int(parts[1])
        # print(f"Generating numbers from {start} to {end}")
        # for i in range(start, end + 1):
        #     print(i)
        #     numbers.append(i)
        numbers.extend(range(start, end + 1))
    return numbers



# Open the file in read mode and use readlines()
with open("input.txt", "r") as f:
    file = f.read()
    numbers = getNumbersFromRanges(file)
    invalidNumbers = [number for number in numbers if isInvalid(number)]
    print(invalidNumbers)
    print(len(invalidNumbers))
    print(sum(invalidNumbers))