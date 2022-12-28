
import java.util.Scanner;

public class Factorial {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Give a number:");
        int n = Integer.valueOf(scanner.nextLine());
        int fact = 1;
        
        for (int count = 1; count <= n; count+= 1) {
            fact *= count;
        }
        System.out.println("Factorial: " + fact);

    }
}
