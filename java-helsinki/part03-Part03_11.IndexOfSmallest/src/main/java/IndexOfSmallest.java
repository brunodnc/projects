
import java.util.ArrayList;
import java.util.Scanner;

public class IndexOfSmallest {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // implement here a program that reads user input
        // until the user enters 9999
        // after that, the program prints the smallest number
        // and its index -- the smallest number
        // might appear multiple times
        ArrayList<Integer> list = new ArrayList<Integer>();

        while (true) {
            int input = Integer.valueOf(scanner.nextLine());
            if (input == 9999) {
                
                int smallest = list.get(0);
                int smallestIndex = 0;
                
                for (int i = 0; i < list.size(); i++) {
                    int number = list.get(i);
                    if (smallest > number) {
                        smallest = number;
                        smallestIndex = i;
                    }
                }
                
                System.out.println("Smallest number: " + smallest);
                System.out.println("Found at index: " + smallestIndex);
                
                break;
            }
            list.add(input);

        }

    }
}
