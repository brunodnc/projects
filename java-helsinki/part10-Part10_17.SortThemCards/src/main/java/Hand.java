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
import java.util.Collections;
import java.util.Comparator;

public class Hand implements Comparable<Hand>{
    private ArrayList<Card> hand;
    
    public Hand() {
        this.hand = new ArrayList<>();
    }
    
    public void add(Card card) {
        this.hand.add(card);
    }
    
    public void print() {
        this.hand.stream().forEach(c -> System.out.println(c));
    }
    
    public void sort() {
        Collections.sort(this.hand);
    }

    public ArrayList<Card> getHand() {
        return this.hand;
    }
    
    public void sortBySuit() {
        Comparator sortBySuit = new BySuitInValueOrder();
        Collections.sort(this.hand, sortBySuit);
    }

    @Override
    public int compareTo(Hand comparedHand) {
        int thisSum = this.hand.stream()
                .map(c -> c.getValue())
                .reduce(0, (a, b) -> a + b);
        int comparedSum = comparedHand.getHand().stream()
                .map(c -> c.getValue())
                .reduce(0, (a, b) -> a + b);
        return thisSum - comparedSum;
    }
    
}
