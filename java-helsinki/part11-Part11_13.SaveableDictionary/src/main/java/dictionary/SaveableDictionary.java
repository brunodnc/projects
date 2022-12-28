/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dictionary;

/**
 *
 * @author admin
 */
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.io.PrintWriter;
import java.util.Scanner;
import java.nio.file.Paths;

public class SaveableDictionary {

    private HashMap<String, String> dict;
    private HashMap<String, String> trans;
    private String file;

    public SaveableDictionary() {
        this.dict = new HashMap<>();
    }

    public SaveableDictionary(String file) {
        this();
        this.file = file;
    }

    public boolean load() {
        try {
            Scanner scanner = new Scanner(Paths.get(file));
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] split = line.split(":");
                String word = split[0];
                String translation = split[1];
                this.add(word, translation);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean save() {
        List<String> uniqueList = new ArrayList<>();
        try {
            PrintWriter writer = new PrintWriter(this.file);
            for (int i = 0; i < this.dict.size(); i += 1) {
                String s = this.dict.keySet().toArray()[i] + ":" + this.dict.values().toArray()[i];
                String[] split = s.split(":");
                if (!uniqueList.contains(split[0]) && !uniqueList.contains(split[1])) {
                    writer.println(s);
                    uniqueList.add(s.split(":")[0]);
                }
            }
            writer.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void add(String word, String translation) {
        this.dict.putIfAbsent(word, translation);
        this.dict.putIfAbsent(translation, word);

    }

    public String translate(String word) {
        if (this.dict.containsKey(word)) {
            return this.dict.get(word);
        }
        return null;
    }

    public void delete(String word) {
        String translation = this.dict.get(word);
        this.dict.remove(word);
        this.dict.remove(translation);

    }

}
