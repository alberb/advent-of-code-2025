import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Part1 {
    public static void main(String[] args) {
        String filePath = "input.txt";
        int location = 50;
        int zeroCounter = 0;

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

                if (direction == 'R') {
                    location += distance;
                } else if (direction == 'L') {
                    location -= distance;
                }

                location = location % 100;

                if (location == 0) {
                    zeroCounter++;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Number of times location was zero: " + zeroCounter);
    }
}
