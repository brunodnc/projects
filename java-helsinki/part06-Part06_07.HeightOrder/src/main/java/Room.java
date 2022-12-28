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
public class Room {
    
    private ArrayList<Person> persons = new ArrayList<>();
    
    public void add(Person person) {
        this.persons.add(person);
    }
    
    public boolean isEmpty() {
        return this.persons.isEmpty();
    }
    
    public ArrayList<Person> getPersons() {
        return this.persons;
    }
    
    public Person shortest() {
        if (this.persons.isEmpty()) {
            return null;
        }
        
        int height = persons.get(0).getHeight();
        Person shortest = persons.get(0);
        
        for (Person person : persons) {
            int personHeight = person.getHeight();
            if (height > personHeight) {
                height = personHeight;
                shortest = person;
            }
        }
        return shortest;
    }
    
    public Person take() {
        if (persons.isEmpty()) {
            return null;
        }
        
        Person shortest = this.shortest();
        persons.remove(shortest);
        return shortest;
        
    }
}
