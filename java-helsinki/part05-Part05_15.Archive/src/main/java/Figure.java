/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Figure {
    
    private String id;
    private String name;
    
    public Figure(String id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public String toString() {
        return this.id + ": " + this.name;
    }
    
    public boolean equals(Object compared) {
        if (this == compared) {
            return true;
        }
        
        if (!(compared instanceof Figure)) {
            return false;
        }
        
        Figure converted = (Figure) compared;
        
        if (this.id.equals(converted.id)) {
            return true;
        }
        return false;
    }
    
}
