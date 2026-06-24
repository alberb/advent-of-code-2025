import java.io.*;
import java.util.*;

public class Part2 {

    static List<String> readLines(String filename) throws IOException {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line.trim());
            }
        }
        return lines;
    }

    static int findLargestBatteryIndex(String bank) {
        int maxIndex = 0;
        int maxValue = -1;
        for (int i = 0; i < bank.length(); i++) {
            int value = Character.getNumericValue(bank.charAt(i));
            if (value > maxValue) {
                maxValue = value;
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    static String findLargestGroup(String bank, int size) {
        if (size == 1) {
            return String.valueOf(bank.charAt(findLargestBatteryIndex(bank)));
        } else if (size == bank.length()) {
            return bank;
        } else {
            int nextIndex = findLargestBatteryIndex(bank.substring(0, bank.length() + 1 - size));
            char nextBattery = bank.charAt(nextIndex);
            String nextGroup = findLargestGroup(bank.substring(nextIndex + 1), size - 1);
            String largestGroup = nextBattery + nextGroup;
            System.out.println("Largest group of size " + size + " in bank " + bank + " is " + largestGroup);
            return largestGroup;
        }
    }

    public static void main(String[] args) throws IOException {
        List<String> lines = readLines("input.txt");
        long total = 0;
        for (String line : lines) {
            total += Long.parseLong(findLargestGroup(line, 12));
        }
        System.out.println(total);
    }
}
