
import java.util.Scanner;

public class LiquidContainers2 {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        Container first = new Container();
        Container second = new Container();

        while (true) {
            System.out.println("First: " + first);
            System.out.println("Second: " + second);

            String input = scan.nextLine();
            String[] array = input.split(" ");
            if (array.length < 2) {
                break;
            }
            String cmd = array[0];
            int amount = Integer.valueOf(array[1]);
            if (cmd.equals("quit")) {
                break;
            }
            if (cmd.equals("add")) {
                first.add(amount);
            }
            if (cmd.equals("move")) {
                if (first.contains() >= amount) {
                    second.add(amount);
                } else {
                    second.add(first.contains());
                }
                first.remove(amount);
                
            }
            if (cmd.equals("remove")) {
                second.remove(amount);
            }

        }
    }

}
