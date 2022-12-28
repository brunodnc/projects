
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Scanner;

public class SportStatistics {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int count = 0;
        int wins = 0;
        int losses = 0;

        System.out.println("File:");
        String file = scan.nextLine();
        System.out.println("Team:");
        String team = scan.nextLine();

        try ( Scanner fileReader = new Scanner(Paths.get(file))) {
            while (fileReader.hasNextLine()) {
                String line = fileReader.nextLine();
                if (line.contains(team)) {
                    count += 1;
                    String[] results = line.split(",");
                    String team1 = results[0];
                    String team2 = results[1];
                    int score1 = Integer.valueOf(results[2]);
                    int score2 = Integer.valueOf(results[3]);
                    if (team1.equals(team) && score1 > score2) {
                        wins += 1;
                    } else if (team2.equals(team) && score2 > score1) {
                        wins += 1;
                    } else {
                        losses += 1;
                    }
                }
                // 
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Games: " + count);
        System.out.println("Wins: " + wins);
        System.out.println("Losses: " + losses);
    }

}
