
import java.util.Scanner;

public class FromWhereToWhere {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Write your program here
        System.out.println("Where to?");
        int to = Integer.valueOf(scanner.nextLine());
        System.out.println("Where from?");
        int from = Integer.valueOf(scanner.nextLine());
        
        if (from == to) {
            System.out.println(from);
        } else if (from < to) {
            for (int count = from; count <= to; count++) {
                System.out.println(count);
            }
        }
        
    }
}
