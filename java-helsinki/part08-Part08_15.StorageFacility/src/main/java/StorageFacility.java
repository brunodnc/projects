/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
import java.util.HashMap;
import java.util.ArrayList;

public class StorageFacility {
    
    private HashMap<String, ArrayList<String>> storage;
    
    public StorageFacility() {
        this.storage = new HashMap<>();
    }
    
    public void add(String unit, String item) {
        if (this.storage.containsKey(unit)) {
            this.storage.get(unit).add(item);
        } else {
            ArrayList<String> items = new ArrayList<>();
            items.add(item);
            this.storage.put(unit, items);
        }
    }
    
    public void remove(String storageUnit, String item) {
        int itemIndex = this.storage.get(storageUnit).indexOf(item);
        this.storage.get(storageUnit).remove(itemIndex);
        if (this.storage.get(storageUnit).isEmpty()) {
            this.storage.remove(storageUnit);
        }
    }
    
    public ArrayList<String> contents(String storageUnit) {
        if (this.storage.containsKey(storageUnit)) {
            return this.storage.get(storageUnit);
        } else {
            ArrayList<String> emptyArrayList = new ArrayList<>();
            return emptyArrayList;
        }
    }
    
    public ArrayList<String> storageUnits() {
        ArrayList<String> uniqueList = new ArrayList<>();
        
        for (String unitItems : this.storage.keySet() ) {
            if (!this.storage.get(unitItems).isEmpty()) {
                uniqueList.add(unitItems);
            }
        }
        
        return uniqueList;
    }
    
}
