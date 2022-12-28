package application;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;

public class JokeApplication extends Application {

    public void start(Stage window) {

        Button jokeButton = new Button("Joke");
        Button answerButton = new Button("Answer");
        Button explanationButton = new Button("Explanation");

        BorderPane layout = new BorderPane();

        HBox menu = new HBox();
        menu.getChildren().addAll(jokeButton, answerButton, explanationButton);

        layout.setTop(menu);

        StackPane mainJoke = createView("What do you call a bear with no teeth?");
        StackPane mainAnswer = createView("A gummy bear.");
        StackPane mainExplanation = createView("Because he has only the gums on his mouth");

        jokeButton.setOnAction((e) -> layout.setCenter(mainJoke));
        answerButton.setOnAction((e) -> layout.setCenter(mainAnswer));
        explanationButton.setOnAction((e) -> layout.setCenter(mainExplanation));

        layout.setCenter(mainJoke);

        window.setScene(new Scene(layout));
        window.show();
    }

    private StackPane createView(String text) {

        StackPane layout = new StackPane();
        layout.getChildren().add(new Label(text));
        layout.setAlignment(Pos.CENTER);

        return layout;
    }

    public static void main(String[] args) {
        launch(JokeApplication.class);
    }
}
