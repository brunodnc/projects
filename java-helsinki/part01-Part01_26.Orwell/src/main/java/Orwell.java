
import java.util.Scanner;

public class Orwell {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        // Write your program here
        System.out.println("Give a number: ");
        int first = Integer.valueOf(scan.nextLine());
        if (first == 1984) { 
            System.out.println("Orwell"); 
        }
    }
}
