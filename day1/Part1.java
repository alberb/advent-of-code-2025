import java.io.*;
import java.util.*;

public class Part1 {
    public static void main(String[] args) throws IOException {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line.trim());
            }
        }

        System.out.println(lines);

        int location = 50;
        int zeroCounter = 0;

        for (String line : lines) {
            System.out.println("Location is currently: " + location);
            System.out.println("Processing line: " + line);

            char direction = line.charAt(0);
            int distance = Integer.parseInt(line.substring(1));

            if (direction == 'R') {
                location += distance;
            } else if (direction == 'L') {
                location -= distance;
            }

            location = ((location % 100) + 100) % 100;

            if (location == 0) {
                zeroCounter++;
            }
        }

        System.out.println("Number of times location was zero: " + zeroCounter);
    }
}
