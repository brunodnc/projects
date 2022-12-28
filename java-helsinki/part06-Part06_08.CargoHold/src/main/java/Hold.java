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
public class Hold {
    private int maximumWeight;
    private ArrayList<Suitcase> suitcases;
    
    public Hold (int maximumWeight) {
        this.maximumWeight = maximumWeight;
        suitcases = new ArrayList<>();
    }
    
    public int totalWeight() {
        int totalWeight = 0;
        for (Suitcase suitcase : suitcases) {
            totalWeight += suitcase.totalWeight();
        }
        return totalWeight;
    }
    
    public void addSuitcase (Suitcase suitcase) {
        int totalWeight = suitcase.totalWeight() + this.totalWeight();
        if (totalWeight <= this.maximumWeight) {
            suitcases.add(suitcase);
        }
    }
    
    public void printItems() {
        for (Suitcase suitcase : suitcases) {
            suitcase.printItems();
        }
    }

    @Override
    public String toString() {
        if (suitcases.isEmpty()) {
            return "no suitcases (0 kg)";
        }
        
        int totalItems = suitcases.size();
        int totalWeight = this.totalWeight();
        
        if (suitcases.size() == 1) {
            return "1 suitcase (" + totalWeight + " kg)";
        }
        
        return totalItems + " suitcases(" + totalWeight + " kg)";
    }
}
