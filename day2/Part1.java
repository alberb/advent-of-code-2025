import java.io.*;
import java.util.*;
import java.util.stream.*;

public class Part1 {

    static boolean isValid(int number) {
        String line = String.valueOf(number);
        if (line.length() % 2 != 0) {
            return true;
        }
        String firstHalf = line.substring(0, line.length() / 2);
        String secondHalf = line.substring(line.length() / 2);
        return !firstHalf.equals(secondHalf);
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
            System.out.println("Generating numbers from " + start + " to " + end);
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
                .filter(n -> !isValid(n))
                .collect(Collectors.toList());

        System.out.println(invalidNumbers);
        System.out.println(invalidNumbers.size());
        System.out.println(invalidNumbers.stream().mapToLong(Integer::longValue).sum());
    }
}
