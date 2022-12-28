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

public class Stack {
    private ArrayList<String> stack = new ArrayList<>();
    
    public boolean isEmpty() {
        return this.stack.isEmpty();
    }
    
    public void add(String value) {
        stack.add(value);
    }
    
    public ArrayList<String> values() {
        return this.stack;
    }
    
    public String take() {
        String value = this.stack.get(this.stack.size() - 1);
        this.stack.remove(this.stack.size() - 1);
        return value;
    }
    
}
