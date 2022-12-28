package FlightControl;

import FlightControl.ui.TextUI;
import FlightControl.logic.FlightControl;
import java.util.Scanner;


public class Main {

    public static void main(String[] args) {
        // Write the main program here. It is useful to create some classes of your own.
        TextUI ui = new TextUI(new FlightControl(), new Scanner(System.in));
        ui.start();
        
    }
}
