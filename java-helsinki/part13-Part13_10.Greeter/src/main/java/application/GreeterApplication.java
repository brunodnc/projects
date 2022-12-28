package application;

import javafx.application.Application;
import javafx.event.Event;
import javafx.geometry.Pos;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.GridPane;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;

public class GreeterApplication extends Application {
    
    public void start(Stage window) {
        
        GridPane layout = new GridPane();
        
        Label label = new Label("Enter your name and start.");
        TextField textField = new TextField();
        Button startButton = new Button("Start");
        
        layout.add(label, 0, 0);
        layout.add(textField, 0, 1);
        layout.add(startButton, 0, 2);
        
        StackPane welcomeLayout = new StackPane();
        Label welcomeMessage = new Label("Welcome!");
        welcomeLayout.getChildren().add(welcomeMessage);
        welcomeLayout.setAlignment(Pos.CENTER);
        Scene welcomeScene = new Scene(welcomeLayout);
        
        startButton.setOnAction((event) -> {
            welcomeMessage.setText("Welcome " + textField.getText() + "!");
            window.setScene(welcomeScene);
        });
        
        Scene firstScene = new Scene(layout);
        
        window.setScene(firstScene);
        window.show();
    }


    public static void main(String[] args) {
        launch(GreeterApplication.class);
    }
}
