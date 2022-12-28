
import java.util.Scanner;

public class GradesAndPoints {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        System.out.println("Give points [0-100]:");
        int p = Integer.valueOf(scan.nextLine());
        if (p < 0 ) { 
            System.out.println("Grade: impossible!"); 
        } else if (p < 50) {
            System.out.println("Grade: failed");
        } else if (p < 60) {
            System.out.println("Grade: 1");
        } else if (p < 70) {
            System.out.println("Grade: 2");
        } else if (p < 80) {
            System.out.println("Grade: 3");
        } else if (p < 90) {
            System.out.println("Grade: 4");
        } else if (p <= 100) {
            System.out.println("Grade: 5");
        } else {
            System.out.println("Grade: incredible!");
        }

    }
}
