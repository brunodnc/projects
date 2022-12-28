/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Counter {

    private int counter;

    public Counter(int value) {
        this.counter = value;
    }

    public Counter() {
        this.counter = 0;
    }

    public int value() {
        return this.counter;
    }

    public void increase() {
        this.counter += 1;
    }

    public void decrease() {
        this.counter -= 1;
    }

    public void increase(int value) {
        if (value > 0) {
            this.counter += value;
        }
    }

    public void decrease(int value) {
        if (value > 0) {
            this.counter -= value;
        }
    }
}
