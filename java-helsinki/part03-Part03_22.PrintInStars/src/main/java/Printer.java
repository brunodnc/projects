
public class Printer {

    public static void main(String[] args) {
        // You can test the method here
        int[] array = {5, 1, 3, 4, 2};
        printArrayInStars(array);
    }

    public static void printArrayInStars(int[] array) {
        // Write some code in here
        for (int number: array) {
            System.out.println(stars(number));
        }
        
    }
    
    public static String stars(int number) {
        int count = 0;
        String star = "*";
        String stars = "";
        while(count < number) {
            count += 1;
            stars += star;
        }
        return stars;
    }

}
