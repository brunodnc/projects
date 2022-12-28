
import java.util.Scanner;

public class SumOfASequenceTheSequel {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("First number?");
        int fn = Integer.valueOf(scanner.nextLine());
        
        System.out.println("Last number?");
        int ln = Integer.valueOf(scanner.nextLine());
        int sum = 0;
        
        for (int count = fn; count <= ln; count+= 1) {
            sum += count;
        }
        System.out.println(sum);

    }
}
