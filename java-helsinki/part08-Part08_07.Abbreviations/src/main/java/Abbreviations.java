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

public class Abbreviations {

    private HashMap<String, String> dict;

    public Abbreviations() {
        this.dict = new HashMap<>();
    }

    public void addAbbreviation(String abbreviation, String explanation) {
        String ab = this.sanitizeString(abbreviation);
        this.dict.put(ab, explanation);
    }

    public boolean hasAbbreviation(String abbreviation) {
        if (this.dict.containsKey(this.sanitizeString(abbreviation))) {
            return true;
        }
        return false;
    }

    public String findExplanationFor(String abbreviation) {
        return this.dict.get(this.sanitizeString(abbreviation));
    }

    public String sanitizeString(String s) {
        s = s.toLowerCase();
        return s.trim();
    }
}
