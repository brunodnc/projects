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
        int totalWeight = 0;
        for (Item item : items) {
            totalWeight += item.getWeight();
        }
        return totalWeight;
    }

    public void printItems() {
        for (Item item : items) {
            System.out.println(item);
        }
    }

    public Item heaviestItem() {
        if (!items.isEmpty()) {
            Item heaviest = items.get(0);
            int weight = items.get(0).getWeight();
            for (Item item : items) {
                if (item.getWeight() > weight) {
                    weight = item.getWeight();
                    heaviest = item;
                }
            }
            return heaviest;
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
