
import java.util.Scanner;

public class NameOfTheOldest {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        String oldestName = "";
        int oldestAge = 0;
        
        while (true) {
            String input = scanner.nextLine();
            if (input.equals("")) {
                break;
            }
            String[] arr = input.split(",");
            if (Integer.valueOf(arr[1]) > oldestAge) {
                oldestName = arr[0];
                oldestAge = Integer.valueOf(arr[1]);
            }
        }
        System.out.println("Name of the oldest: " + oldestName);

    }
}
