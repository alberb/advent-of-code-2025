import java.io.*;
import java.util.*;

public class Part2 {
    public static void main(String[] args) throws IOException {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader("test-input.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line.trim());
            }
        }

        System.out.println(lines);

        int location = 50;
        int zeroCounter = 0;
        int pastZeroCounter = 0;

        for (String line : lines) {
            System.out.println("Location is currently: " + location);
            System.out.println("Processing line: " + line);

            char direction = line.charAt(0);
            int distance = Integer.parseInt(line.substring(1));

            for (int i = 0; i < distance; i++) {
                if (direction == 'R') {
                    location += 1;
                } else if (direction == 'L') {
                    location -= 1;
                }

                location = ((location % 100) + 100) % 100;

                if (location == 0) {
                    pastZeroCounter++;
                    System.out.println("Location went past zero! Total times: " + pastZeroCounter);
                }
            }
        }

        System.out.println("Number of times location was zero: " + zeroCounter);
        System.out.println("Number of times location went past zero: " + pastZeroCounter);
        System.out.println("Total: " + (zeroCounter + pastZeroCounter));
    }
}
