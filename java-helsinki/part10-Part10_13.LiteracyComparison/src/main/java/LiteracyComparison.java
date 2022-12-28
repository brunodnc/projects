import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Paths;

public class LiteracyComparison {

    public static void main(String[] args) {
        try {
            Files.lines(Paths.get("literacy.csv"))
                    .map(l -> l.split(","))
                    .sorted((a, b) -> a[5].compareTo(b[5]))
                    .forEach(split -> {
                        String country = split[3];
                        String year = split[4];
                        String gender = split[2].trim().split(" ")[1];
                        String percent = split[5];
                        System.out.println(country + " (" + year + "), " + gender + ", " + percent);
                    });

        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
