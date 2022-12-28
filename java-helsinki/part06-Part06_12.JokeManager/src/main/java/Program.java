
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        JokeManager jokes = new JokeManager();
        UserInterface ui = new UserInterface(jokes, scanner);
        
        System.out.println("What a joke!");
        ui.start();
    }
}
