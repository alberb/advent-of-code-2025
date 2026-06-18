import java.io.*;
import java.util.*;
import java.util.stream.*;

public class Part2 {

    static boolean isInvalidForLength(int number, int length) {
        String line = String.valueOf(number);
        if (line.length() % length != 0) {
            return false;
        }
        List<String> chunks = new ArrayList<>();
        for (int i = 0; i < line.length(); i += length) {
            chunks.add(line.substring(i, i + length));
        }
        boolean invalid = chunks.stream().allMatch(c -> c.equals(chunks.get(0)));
        if (invalid) {
            System.out.println("Number " + number + " is invalid for length " + length);
        }
        return invalid;
    }

    static boolean isInvalid(int number) {
        String line = String.valueOf(number);
        boolean invalid = IntStream.rangeClosed(1, line.length() / 2)
                .anyMatch(length -> isInvalidForLength(number, length));
        if (invalid) {
            System.out.println("Number " + number + " is invalid");
        }
        return invalid;
    }

    static List<Integer> getNumbersFromRanges(String file) {
        List<Integer> numbers = new ArrayList<>();
        String[] ranges = file.split(",");
        for (String r : ranges) {
            System.out.println(r);
            String cleanLine = r.trim();
            String[] parts = cleanLine.split("-");
            int start = Integer.parseInt(parts[0].trim());
            int end = Integer.parseInt(parts[1].trim());
            for (int i = start; i <= end; i++) {
                numbers.add(i);
            }
        }
        return numbers;
    }

    public static void main(String[] args) throws IOException {
        String file;
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
            file = br.lines().collect(Collectors.joining(","));
        }

        List<Integer> numbers = getNumbersFromRanges(file);
        List<Integer> invalidNumbers = numbers.stream()
                .filter(Part2::isInvalid)
                .collect(Collectors.toList());

        System.out.println(invalidNumbers);
        System.out.println(invalidNumbers.size());
        System.out.println(invalidNumbers.stream().mapToLong(Integer::longValue).sum());
    }
}
