
import java.nio.file.Paths;
import java.util.Scanner;

public class RecordsFromAFile {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Name of the file:");
        String fileName = scanner.nextLine();

        try ( Scanner fileReader = new Scanner(Paths.get(fileName))) {
            while (fileReader.hasNextLine()) {
                String line = fileReader.nextLine();
                String[] splittedLine = line.split(",");
                String name = splittedLine[0];
                String age = splittedLine[1];
                if (Integer.valueOf(age) != 1) {
                    System.out.println(name + ", age: " + age + " years");
                } else {
                    System.out.println(name + ", age: " + age + " year");
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
