
import java.util.Scanner;

public class LiquidContainers {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int first = 0;
        int second = 0;

        while (true) {
            System.out.println("First: " + first + "/100");
            System.out.println("Second: " + second + "/100");

            String input = scan.nextLine();
            String[] array = input.split(" ");
            if (array.length < 2) {
                break;
            }
            String cmd = array[0];
            int amount = Integer.valueOf(array[1]);
            if (cmd.equals("quit")) {
                break;
            }
            if (cmd.equals("add")) {
                if (amount >= 0) {
                    first += amount;
                }
                if (first > 100) {
                    first = 100;
                }
            }
            if (cmd.equals("move")) {
                if (amount > first) {
                    second += first;
                    first = 0;
                } else {
                    first -= amount;
                    second += amount;
                }
                if (second > 100) {
                    second = 100;
                }
            }
            if (cmd.equals("remove")) {
                second -= amount;
                if (second < 0) {
                    second = 0;
                }
            }

        }
    }

}
