
import java.util.Scanner;

public class AverageOfPositiveNumbers {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int count = 0;
        int sum = 0;
        
        while (true) {
            int n = Integer.valueOf(scanner.nextLine());
            if (n == 0) {
                if (count == 0) {
                    System.out.println("Cannot calculate the average");
                    break;
                } else {
                    System.out.println("Average of the numbers: " + ((double) sum / count));
                    break;
                }        
            } else if (n > 0) {
                count = count + 1;
                sum = sum + n;
            }
        }

    }
}
