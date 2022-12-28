
import java.util.Scanner;

public class AgeOfTheOldest {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String str = "init";

        int oldestAge = 0;

        while (!str.equals("")) {
            str = scanner.nextLine();
            if (!str.equals("")) {
                String[] strArray = str.split(",");
                int age = Integer.valueOf(strArray[1]);
                if (age > oldestAge) {
                    oldestAge = age;
                }
            }

        }
        System.out.println("Age of the oldest " + oldestAge);

    }
}
