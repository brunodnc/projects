import java.util.ArrayList;

public class MainProgram {

    public static void main(String[] args) {
        // test your classes here

        Employees t = new Employees();
        ArrayList<Person> list = new ArrayList<>();
        
        Person h = new Person("Arto", Education.PHD);
        Person i = new Person("Turo", Education.BA);
        list.add(h);
        list.add(i);
        t.add(list);
        t.print();
    }
}
