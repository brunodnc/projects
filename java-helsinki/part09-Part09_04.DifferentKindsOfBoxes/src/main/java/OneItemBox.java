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

public class OneItemBox extends Box {

    private int capacity;
    private ArrayList<Item> items;

    public OneItemBox() {
        this.capacity = 1;
        items = new ArrayList<>();
    }
    
    public void add(Item item) {
        if (items.size() < 1) {
            this.items.add(item);
        }
    }

    @Override
    public boolean isInBox(Item item) {
        return items.contains(item);
    }
    
    

}
