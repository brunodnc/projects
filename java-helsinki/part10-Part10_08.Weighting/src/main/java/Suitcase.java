/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
import java.util.ArrayList;

public class Suitcase {

    private int maximumWeight;
    private ArrayList<Item> items;

    public Suitcase(int maximumWeight) {
        this.maximumWeight = maximumWeight;
        items = new ArrayList<>();
    }

    public void addItem(Item item) {
        int totalWeight = this.totalWeight();
        totalWeight += item.getWeight();
        if (totalWeight <= maximumWeight) {
            items.add(item);
        }
    }

    public int totalWeight() {
        return this.items.stream()
                .map(i -> i.getWeight())
                .reduce(0, (a, b) -> a + b);
    }

    public void printItems() {
        this.items.stream().forEach(i -> System.out.println(i));
    }

    public Item heaviestItem() {
        if (!items.isEmpty()) {
            return this.items.stream()
                    .reduce(this.items.get(0), (a, b) -> b.getWeight() > a.getWeight() ? b : a);
        }
        return null;
    }

    @Override
    public String toString() {

        if (items.isEmpty()) {
            return "no items (0 kg)";
        }

        int totalItems = items.size();
        int totalWeight = this.totalWeight();

        if (items.size() == 1) {
            return "1 item (" + totalWeight + " kg)";
        }

        return totalItems + " items (" + totalWeight + " kg)";
    }

}
