
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ArrayList<Figure> list = new ArrayList<>();
        ArrayList<Figure> noRepeatList = new ArrayList<>();

        while (true) {
            System.out.println("Identifier? (empty will stop)");
            String id = scanner.nextLine();
            if (id.isEmpty()) {
                System.out.println("==Items==");
                for (Figure figure : list) {
                    if (!(noRepeatList.contains(figure))) {
                        noRepeatList.add(figure);
                    }
                }
                for (Figure uniqueFigure : noRepeatList) {
                    System.out.println(uniqueFigure);
                }
                break;
            }
            System.out.println("Name? (empty will stop)");
            String name = scanner.nextLine();
            if (name.isEmpty()) {
                System.out.println("==Items==");
                for (Figure figure : list) {
                    if (!(noRepeatList.contains(figure))) {
                        noRepeatList.add(figure);
                    }
                }
                for (Figure uniqueFigure : noRepeatList) {
                    System.out.println(uniqueFigure);
                }
                break;
            }
            list.add(new Figure(id, name));
        }

    }
}
