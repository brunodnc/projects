
import java.util.ArrayList;
import java.util.Scanner;

public class PersonalInformationCollection {

    public static void main(String[] args) {
        // implement here your program that uses the PersonalInformation class

        ArrayList<PersonalInformation> infoCollection = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        
        while(true) {
            System.out.println("First name:");
            String name = scanner.nextLine();
            if (name.isEmpty()) {
                for (PersonalInformation item: infoCollection) {
                    System.out.println(item.getFirstName() + " " + item.getLastName());
                }
                break;
            }
            System.out.println("Last name:");
            String lastName = scanner.nextLine();
            System.out.println("Identificatio Number:");
            String id = scanner.nextLine();
            infoCollection.add(new PersonalInformation(name, lastName, id));
        }
        

    }
}
