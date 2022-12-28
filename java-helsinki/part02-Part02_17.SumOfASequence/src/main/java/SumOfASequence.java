
import java.util.Scanner;

public class SumOfASequence {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Last number?");
        int ln = Integer.valueOf(scanner.nextLine());
        int sum = 0;
        
        for (int count = 0; count <= ln; count+= 1) {
            sum += count;
        }
        System.out.println(sum);

    }
}
