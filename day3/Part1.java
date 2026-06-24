import java.io.*;
import java.util.*;
import java.util.stream.*;

public class Part1 {

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

    static List<Long> listAllBatteryPairs(String bank) {
        List<Long> pairs = new ArrayList<>();
        for (int i = 0; i < bank.length(); i++) {
            for (int j = i + 1; j < bank.length(); j++) {
                String pair = "" + bank.charAt(i) + bank.charAt(j);
                pairs.add(Long.parseLong(pair));
            }
        }
        return pairs;
    }

    static long findMaxPair(String line) {
        List<Long> pairs = listAllBatteryPairs(line);
        long maxPair = pairs.stream().mapToLong(Long::longValue).max().orElse(0);
        System.out.println("Max pair in line " + line + " is " + maxPair);
        return maxPair;
    }

    public static void main(String[] args) throws IOException {
        List<String> lines = readLines("input.txt");
        long total = lines.stream().mapToLong(Part1::findMaxPair).sum();
        System.out.println(total);
    }
}
