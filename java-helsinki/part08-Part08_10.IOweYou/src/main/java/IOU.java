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

public class IOU {
    private HashMap<String, Double> debt;
    
    
    public IOU() {
        this.debt = new HashMap<>();
    }
    
    public void setSum(String toWhom, double amount) {
        this.debt.put(this.sanitize(toWhom), amount);
    }
    
    public double howMuchDoIOweTo(String toWhom) {
        return this.debt.getOrDefault(this.sanitize(toWhom), 0.0);
    }
    
    public String sanitize(String s) {
        s = s.toLowerCase();
        s = s.trim();
        return s;
    }
}
