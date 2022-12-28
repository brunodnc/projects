
import java.util.ArrayList;

public class SimpleCollection {

    private String name;
    private ArrayList<String> elements;

    public SimpleCollection(String name) {
        this.name = name;
        this.elements = new ArrayList<>();
    }

    public void add(String element) {
        this.elements.add(element);
    }

    public ArrayList<String> getElements() {
        return this.elements;
    }

    @Override
    public String toString() {
        String string = "The collection " + this.name + " ";
        if (elements.isEmpty()) {
            string += "is empty.";
        } else if (elements.size() == 1) {
            string += "has " + elements.size() + " element:" + "\n" + elements.get(0);
        } else {
            string += "has " + elements.size() + " elements:";
            for (String element : elements) {
                string += "\n";
                string += element;
            }
        }
        return string;
    }

}
