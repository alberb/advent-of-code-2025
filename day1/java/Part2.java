import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Part2 {
    public static void main(String[] args) {
        String filePath = "test-input.txt";
        int location = 50;
        int zeroCounter = 0;
        int pastZeroCounter = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty()) {
                    continue;
                }

                System.out.println("Location is currently: " + location);
                System.out.println("Processing line: " + line);

                char direction = line.charAt(0);
                int distance = Integer.parseInt(line.substring(1));

                // Step-by-step movement to catch all zero-crossing occurrences
                for (int i = 0; i < distance; i++) {
                    if (direction == 'R') {
                        location += 1;
                    } else if (direction == 'L') {
                        location -= 1;
                    }

                    location = location % 100;

                    if (location == 0) {
                        pastZeroCounter++;
                        System.out.println("Location went past zero! Total times: " + pastZeroCounter);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Number of times location was zero: " + zeroCounter);
        System.out.println("Number of times location went past zero: " + pastZeroCounter);
        System.out.println("Total: " + (zeroCounter + pastZeroCounter));
    }
}
