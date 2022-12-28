/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Timer {
    
    ClockHand seconds;
    ClockHand hundreths;
    
    
    
    public Timer() {
        this.seconds = new ClockHand(60);
        this.hundreths = new ClockHand(100);
    }
    
    public String toString() {
        return this.seconds + ":" + this.hundreths;
    }
    
    public void advance() {
        this.hundreths.advance();
        if (this.hundreths.value() == 0) {
            this.seconds.advance();
        }
    }
}
