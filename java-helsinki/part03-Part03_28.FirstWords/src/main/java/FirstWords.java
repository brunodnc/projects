
import java.util.Scanner;

public class FirstWords {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String str = "init";

        while (!str.equals("")) {
            str = scanner.nextLine();
            String[] strArray = str.split(" ");
            System.out.println(strArray[0]);
        }
    }

}
