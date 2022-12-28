/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Whistle {
    
    private String sound;
    
    public Whistle(String s) {
        this.sound = s;
    }
    
    public void sound() {
        System.out.println(this.sound);
    }
    
}
