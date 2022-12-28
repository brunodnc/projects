/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
import java.util.Scanner;

public class TextUI {

    private Scanner scanner;
    private SimpleDictionary dict;

    public TextUI(Scanner scanner, SimpleDictionary dict) {
        this.scanner = scanner;
        this.dict = dict;
    }

    public void start() {
        while (true) {
            System.out.println("Command:");
            String cmd = scanner.nextLine();
            if (cmd.equals("end")) {
                System.out.println("Bye bye!");
                break;
            }
            if (cmd.equals("add")) {
                System.out.println("Word:");
                String word = scanner.nextLine();
                System.out.println("Translation:");
                String translation = scanner.nextLine();
                dict.add(word, translation);
                continue;
            }

            if (cmd.equals("search")) {
                System.out.println("To be translated:");
                String word = scanner.nextLine();
                System.out.println("Translation:");
                String translation = dict.translate(word);
                if (translation == null) {
                    System.out.println("Word " + word + " was not found");
                    continue;
                }
                System.out.println(translation);
                continue;
            }
            System.out.println("Unknown command");
        }

    }

}
