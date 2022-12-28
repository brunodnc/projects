
import java.util.Scanner;

public class Counting {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int n = Integer.valueOf(scanner.nextLine());
        for (int count = 0; count <= n; count++) {
            System.out.println(count);
        }

    }
}
