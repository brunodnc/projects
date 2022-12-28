
import java.util.ArrayList;
import java.util.Scanner;

public class LimitedNumbers {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<Integer> list = new ArrayList<>();
        
        while(true) {
            int input = Integer.valueOf(scanner.nextLine());
            if (input < 0) {
                list.stream().filter(n -> n > 0 && n <= 5)
                        .forEach(i -> System.out.println(i));
                break;
            }
            list.add(input);
        }

    }
}
