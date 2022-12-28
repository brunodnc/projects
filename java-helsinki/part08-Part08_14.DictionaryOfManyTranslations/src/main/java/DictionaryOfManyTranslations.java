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
import java.util.ArrayList;


public class DictionaryOfManyTranslations {
    
    private HashMap<String, ArrayList<String>> dict;
    
    public DictionaryOfManyTranslations() {
        this.dict = new HashMap<>();
    }
    
    public void add(String word, String translation) {
        if (this.dict.containsKey(word)) {
            this.dict.get(word).add(translation);
        } else {
            ArrayList<String> translations = new ArrayList<>();
            translations.add(translation);
            this.dict.put(word, translations);
        }
        
    }
    
    public ArrayList<String> translate(String word) {
        ArrayList<String> emptyArray = new ArrayList<>();
        return this.dict.getOrDefault(word, emptyArray);
    }
    
    public void remove(String word) {
        this.dict.remove(word);
    }
            
    
}
