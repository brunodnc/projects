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
    private Recipes recipes;

    public UserInterface(Scanner scanner) {
        this.scanner = scanner;
    }

    public void start() {
        System.out.println("File to read:");
        String file = scanner.nextLine();

        System.out.println("Commands");
        System.out.println("list - lists the recipes");
        System.out.println("stop - stops the program");
        System.out.println("find name - searches recipes by name");
        System.out.println("find cooking time - searches recipes by cooking time");
        System.out.println("find ingredient - searches recipes by ingredient");
        
        this.recipes = new Recipes(file);

        while (true) {
            System.out.println("Enter command");
            String cmd = scanner.nextLine();
            if (cmd.equals("stop")) {
                break;
            }
            if (cmd.equals("list")) {
                this.recipes.list();
            }
            if (cmd.equals("find name")) {
                System.out.println("Searched word:");
                String word = scanner.nextLine();
                this.recipes.printByName(word);
            }
            if (cmd.equals("find cooking time")) {
                System.out.println("Max cooking time:");
                int max = Integer.valueOf(scanner.nextLine());
                this.recipes.printRecipesByMaxCookingTime(max);
            }
            if (cmd.equals("find ingredient")) {
                System.out.println("Ingredient:");
                String ingredient = scanner.nextLine();
                this.recipes.printRecipesByIngredient(ingredient);
            }
        }

    }

}
