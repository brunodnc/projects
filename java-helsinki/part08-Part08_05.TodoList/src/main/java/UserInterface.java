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

public class UserInterface {

    private TodoList list;
    private Scanner scanner;

    public UserInterface(TodoList list, Scanner scanner) {
        this.list = list;
        this.scanner = scanner;
    }

    public void start() {
        while (true) {
            System.out.println("Command:");
            String cmd = scanner.nextLine();
            if (cmd.equals("stop")) {
                break;
            }
            if (cmd.equals("add")) {
                System.out.println("To add:");
                String task = scanner.nextLine();
                list.add(task);
            }
            if (cmd.equals("list")) {
                list.print();
            }
            if (cmd.equals("remove")) {
                System.out.println("Which one is removed?");
                int number = Integer.valueOf(scanner.nextLine());
                list.remove(number);
            }
        }
    }

}
