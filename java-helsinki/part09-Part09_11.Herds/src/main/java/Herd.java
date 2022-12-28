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

public class Herd implements Movable {

    private ArrayList<Movable> herd;

    public Herd() {
        this.herd = new ArrayList<>();
    }
    
    public void addToHerd(Movable movable) {
        this.herd.add(movable);
    }
    
    public void move(int dx, int dy) {
        for (Movable item : this.herd) {
            item.move(dx, dy);
        }
    }

    @Override
    public String toString() {
        String string = "";
        for (Movable item : this.herd) {
            string += item + "\n";
        }
        return string;
    }

}
