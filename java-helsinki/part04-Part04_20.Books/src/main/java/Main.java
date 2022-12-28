import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        // implement here the program that allows the user to enter 
        // book information and to examine them
        
        Scanner scanner = new Scanner(System.in);
        ArrayList<Book> books = new ArrayList<>();
        
        while(true) {
            System.out.println("Title:");
            String title = scanner.nextLine();
            if (title.isEmpty()) {
                System.out.println("What information will be printed?");
                String option = scanner.nextLine();
                for (Book book: books) {
                    if (option.equals("everything")) {
                        System.out.println(book);
                    } else if (option.equals("name")) {
                        System.out.println(book.getTitle());
                    }
                }
                break;
            }
            System.out.println("Pages:");
            int pages = Integer.valueOf(scanner.nextLine());
            System.out.println("Publication year:");
            int published = Integer.valueOf(scanner.nextLine());
            books.add(new Book(title, pages, published));
        }
        
      
        

    }
}
