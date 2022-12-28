
import java.util.Scanner;

public class AVClub {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String str = "init";

        while (!str.equals("")) {
            str = scanner.nextLine();
            String[] strArray = str.split(" ");
            for (String part : strArray) {
                if (part.contains("av")) {
                    System.out.println(part);
                }
            }
        }
    }
}
