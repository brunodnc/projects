
import java.util.ArrayList;
import java.util.Scanner;

public class PrintingUserInput {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<String> list = new ArrayList<>();
        
        while(true) {
            String input = scanner.nextLine();
            if (input.isEmpty()) {
                list.stream().forEach(i -> System.out.println(i));
                break;
            }
            list.add(input);
        }
        

    }
}
