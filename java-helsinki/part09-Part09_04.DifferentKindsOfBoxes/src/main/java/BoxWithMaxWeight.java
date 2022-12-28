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

public class BoxWithMaxWeight extends Box {

    private int capacity;
    private ArrayList<Item> items;

    public BoxWithMaxWeight(int capacity) {
        super();
        this.capacity = capacity;
        this.items = new ArrayList<>();
    }

    public void add(Item item) {
        int currentWeight = 0;
        for (Item it : this.items) {
            currentWeight += it.getWeight();
        }
        if (currentWeight + item.getWeight() <= this.capacity) {
            this.items.add(item);
        }
    }

    public boolean isInBox(Item item) {
        return this.items.contains(item);
    }

}
