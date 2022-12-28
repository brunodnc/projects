
import java.util.Scanner;

public class LineByLine {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = "init";

        while (!str.equals("")) {
            str = scanner.nextLine();
            String[] strArray = str.split(" ");
            for (String part: strArray) {
                System.out.println(part);
            }
        }

    }
}
