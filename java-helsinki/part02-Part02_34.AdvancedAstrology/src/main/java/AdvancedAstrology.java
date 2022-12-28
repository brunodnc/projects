
public class AdvancedAstrology {

    public static void printStars(int number) {
        // first part of the exercise
        String star = "*";
        String stars = "";
        for (int i = 0; i < number; i += 1) {
            stars += star;
        }
        System.out.println(stars);
    }

    public static void printSpaces(int number) {
        int numSpaces = 0;
        while (numSpaces < number) {
            System.out.print(" ");
            numSpaces++;
        }
    }

    public static String printStars2(int number) {
        // first part of the exercise
        String star = "*";
        String stars = "";
        for (int i = 0; i < number; i += 1) {
            stars += star;
        }
        return stars;
    }

    public static String printSpaces2(int number) {
        // first part of the exercise
        String space = " ";
        String spaces = "";
        for (int i = 0; i < number; i += 1) {
            spaces += space;
        }
        return spaces;
    }

    public static void printTriangle(int size) {
        // part 2 of the exercise
        for (int i = 1; i <= size; i += 1) {
            System.out.println(printSpaces2(size - i) + printStars2(i));
        }
    }

    public static void christmasTree(int height) {
        // part 3 of the exercise
        System.out.println(printSpaces2(height - 1) + "*");
        for (int i = 1; i < height; i += 1) {
            System.out.println(printSpaces2(height - i - 1) + printStars2(i) + "*" + printStars2(i));
        }
        System.out.println(printSpaces2(height - 2) + "***");
        System.out.println(printSpaces2(height - 2) + "***");
    }

    public static void main(String[] args) {
        // The tests are not checking the main, so you can modify it freely.

        printTriangle(5);
        System.out.println("---");
        christmasTree(4);
        System.out.println("---");
        christmasTree(10);
    }
}
