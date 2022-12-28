
import java.util.Scanner;

public class CountingToHundred {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = Integer.valueOf(scanner.nextLine());
        for (int count = n; count <= 100; count++) {
            System.out.println(count);
        }
    }
}
