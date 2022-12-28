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
import java.util.ArrayList;

public class UserInterface {

    private Scanner scanner;
    private ArrayList<Bird> birdList;

    public UserInterface(Scanner scanner) {
        this.scanner = scanner;
        this.birdList = new ArrayList<>();
    }

    public void start() {
        while (true) {
            System.out.println("?");
            String cmd = scanner.nextLine();
            if (cmd.equals("Add")) {
                System.out.println("Name:");
                String name = scanner.nextLine();
                System.out.println("Name in Latin:");
                String latin = scanner.nextLine();
                this.birdList.add(new Bird(name, latin));
            }
            if (cmd.equals("Observation")) {
                System.out.println("Bird?");
                String birdName = scanner.nextLine();
                for (Bird bird : birdList) {
                    if (bird.getName().equals(birdName)) {
                        bird.observe();
                        continue;
                    }
                }
                System.out.println("Not a bird!");
            }
            if (cmd.equals("All")) {
                for (Bird bird : birdList) {
                    System.out.println(bird);
                }
            }
            if (cmd.equals("One")) {
                System.out.println("Bird?");
                String birdName = scanner.nextLine();
                for (Bird bird : birdList) {
                    if (bird.getName().equals(birdName)) {
                        System.out.println(bird);
                        continue;
                    }
                }
                System.out.println("Not a bird!");
            }
            if (cmd.equals("Quit")) {
                break;
            }
        }

    }

}
