
import java.util.ArrayList;
import java.util.Scanner;

public class AverageOfSelectedNumbers {

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
        
        double positiveAverage = inputs.stream().mapToInt(i -> Integer.valueOf(i)).filter(n -> n >= 0).average().getAsDouble();
        double negativeAverage = inputs.stream().mapToInt(i -> Integer.valueOf(i)).filter(n -> n < 0).average().getAsDouble();
        System.out.println("Print the average of the negative numbers or the positive numbers? (n/p)");
        String optionSelect = scanner.nextLine();
        if (optionSelect.equals("p")) {
            System.out.println("average of the positive numbers: " + positiveAverage);
        }
        if (optionSelect.equals("n")) {
            System.out.println("average of the negative numbers: " + negativeAverage);
        }
    }
}
