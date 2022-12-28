
import java.util.ArrayList;
import java.util.Scanner;

public class PersonalDetails {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String longestName = "";
        int sumAge = 0;
        int ageCount = 0;
        
        while (true) {
            String input = scanner.nextLine();
            if (input.equals("")) {
                break;
            }
            String[] arr = input.split(",");
            if (arr[0].length() > longestName.length()) {
                longestName = arr[0];
            }
            int age = Integer.valueOf(arr[1]);
            sumAge += age;
            ageCount += 1;
        }
        System.out.println("Longest name: " + longestName);
        System.out.println("Average of the birth years: " + ((double) sumAge / ageCount));
    }
}
