/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Multiplier {
    
    private int multiplyBy;
    
    public Multiplier(int number) {
        this.multiplyBy = number;
    }
    
    public int multiply(int number){
        return this.multiplyBy *= number;
    }
    
}
