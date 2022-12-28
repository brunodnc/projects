
import java.util.ArrayList;
import java.util.Scanner;

public class AverageOfNumbers {
    

    public static void main(String[] args) {
        ArrayList<String> inputs = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        // Write your program here
        System.out.println("Input numbers, type \"end\" to stop.");
        while (true) {
            String input = scanner.nextLine();
            if (input.equals("end")) {
                break;
            }
            inputs.add(input);
        }
        
        double average = inputs.stream().mapToInt(i -> Integer.valueOf(i)).average().getAsDouble();
        System.out.println("average of the numbers: " + average);
        
        
    }
}
