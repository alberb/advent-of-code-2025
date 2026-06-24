import java.io.*;
import java.util.*;

public class Part1 {

    static char[][] readFileAsGrid(String filename) throws IOException {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line.strip());
            }
        }
        char[][] grid = new char[lines.size()][];
        for (int i = 0; i < lines.size(); i++) {
            grid[i] = lines.get(i).toCharArray();
        }
        return grid;
    }

    static boolean hasPaper(int x, int y, char[][] grid) {
        if (y < 0 || y >= grid.length) return false;
        if (x < 0 || x >= grid[0].length) return false;
        return grid[y][x] == '@';
    }

    static boolean isPaperMoveable(int x, int y, char[][] grid) {
        if (!hasPaper(x, y, grid)) return false;

        int adjacentCount = 0;
        if (hasPaper(x - 1, y - 1, grid)) adjacentCount++;
        if (hasPaper(x,     y - 1, grid)) adjacentCount++;
        if (hasPaper(x + 1, y - 1, grid)) adjacentCount++;
        if (hasPaper(x - 1, y,     grid)) adjacentCount++;
        if (hasPaper(x + 1, y,     grid)) adjacentCount++;
        if (hasPaper(x - 1, y + 1, grid)) adjacentCount++;
        if (hasPaper(x,     y + 1, grid)) adjacentCount++;
        if (hasPaper(x + 1, y + 1, grid)) adjacentCount++;

        return adjacentCount < 4;
    }

    static int findAnswer(String fileName) throws IOException {
        char[][] grid = readFileAsGrid(fileName);
        int moveableCount = 0;
        for (int y = 0; y < grid.length; y++) {
            for (int x = 0; x < grid[0].length; x++) {
                if (isPaperMoveable(x, y, grid)) {
                    System.out.println("Found moveable paper at (" + x + ", " + y + ")");
                    moveableCount++;
                }
            }
        }
        return moveableCount;
    }

    public static void main(String[] args) throws IOException {
        int testAnswer = findAnswer("test.txt");
        System.out.println("Test answer: " + testAnswer);
        assert testAnswer == 13 : "Expected 13 but got " + testAnswer;

        int answer = findAnswer("input.txt");
        System.out.println("Answer: " + answer);
    }
}
