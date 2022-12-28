/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
public class Bird {

    private String name;
    private String latin;
    private int observations;

    public Bird(String name, String latin) {
        this.name = name;
        this.latin = latin;
        this.observations = 0;
    }

    public String getName() {
        return name;
    }

    public String getLatin() {
        return latin;
    }

    public int getObservations() {
        return observations;
    }
    
    public void observe() {
        this.observations += 1;
    }

    @Override
    public String toString() {
        if (this.observations == 1) {
            return this.name + "(" + this.latin + "): " + this.observations + " observation";
        } else {
            return this.name + "(" + this.latin + "): " + this.observations + " observations";
        }
    }

}
