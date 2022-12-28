
import java.nio.file.Paths;
import java.util.Scanner;
import java.util.ArrayList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author admin
 */
public class Recipes {

    private ArrayList<Recipe> recipes;
    private ArrayList<String> ingredients;

    public Recipes(String file) {
        recipes = new ArrayList<>();
        

        try ( Scanner fileReader = new Scanner(Paths.get(file))) {
            while (fileReader.hasNextLine()) {
                String name = fileReader.nextLine();
                System.out.println(name);
                int time = Integer.valueOf(fileReader.nextLine());
                ingredients = new ArrayList<>();
                while (true) {
                    String ingredient = fileReader.nextLine();
                    if (ingredient.equals("") || !fileReader.hasNextLine()) {
                        break;
                    }
                    ingredients.add(ingredient);
                }
                recipes.add(new Recipe(name, time, ingredients));
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void list() {
        for (Recipe recipe : recipes) {
            System.out.println(recipe);
        }
    }

    public Recipe printByName(String name) {
        for (Recipe recipe : recipes) {
            if (recipe.getName().contains(name)) {
                System.out.println(recipe);
            }
        }
        return null;
    }

    public void printRecipesByMaxCookingTime(int max) {
        for (Recipe recipe : recipes) {
            if (recipe.getTime() <= max) {
                System.out.println(recipe);
            }
        }
    }

    public void printRecipesByIngredient(String ingredient) {
        for (Recipe recipe : recipes) {
            if (recipe.getIngredients().contains(ingredient)) {
                System.out.println(recipe);
            }
        }
    }

}
