/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

public class Warehouse {

    private Map<String, Integer> storage;
    private Map<String, Integer> stock;

    public Warehouse() {
        this.storage = new HashMap<>();
        this.stock = new HashMap<>();
    }

    public void addProduct(String product, int price, int stock) {
        this.storage.put(product, price);
        this.stock.put(product, stock);
    }

    public int price(String product) {
        return this.storage.getOrDefault(product, -99);
    }

    public int stock(String product) {
        return this.stock.getOrDefault(product, 0);
    }

    public boolean take(String product) {
        if (!this.stock.containsKey(product)) {
            return false;
        }
        int stock = this.stock.get(product);
        stock -= 1;
        if (stock < 0) {
            stock = 0;
            this.stock.put(product, stock);
            return false;
        }
        this.stock.put(product, stock);
        return true;
    }
    
    public Set<String> products() {
        return this.storage.keySet();
    }

}
