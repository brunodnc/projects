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

public class Box implements Packable {

    private ArrayList<Packable> box;
    private double capacity;

    public Box(double capacity) {
        this.box = new ArrayList<>();
        this.capacity = capacity;
    }

    public void add(Packable item) {
        if (this.weight() + item.weight() <= this.capacity) {
            this.box.add(item);
        }
    }

    public double weight() {
        double totalWeight = 0.0;
        for (Packable item : this.box) {
            totalWeight += item.weight();
        }
        return totalWeight;
    }

    @Override
    public String toString() {
        return "Box: " + this.box.size() + " items, total weight " + this.weight() + " kg";
    }

}
