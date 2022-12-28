package textstatistics;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import java.util.Arrays;

public class TextStatisticsApplication extends Application {


    public void start(Stage window) {
        BorderPane layout = new BorderPane();
        
        TextArea tArea = new TextArea();
        layout.setCenter(tArea);
        
        HBox hbox = new HBox();
        hbox.setSpacing(10);
        
        Label lettersLabel = new Label("Letters: 0");
        Label wordsLabel = new Label("Words: 0");
        Label longestLabel = new Label("The longest word is: ");
        
        hbox.getChildren().add(lettersLabel);
        hbox.getChildren().add(wordsLabel);
        hbox.getChildren().add(longestLabel);
        layout.setBottom(hbox);
        
        
        
        tArea.textProperty().addListener((change, oldValue, newValue) -> {
            int characters = newValue.length();
            String[] split = newValue.split(" ");
            int words = split.length;
            
            String longest = Arrays.stream(split)
                    .sorted((prev, cur) -> cur.length() - prev.length())
                    .findFirst()
                    .get();
            
            lettersLabel.setText("Letters: " + characters);
            wordsLabel.setText("Words: " + words);
            longestLabel.setText("The longest word is: " + longest);
        });
        
        
        Scene view = new Scene(layout);
        
        window.setScene(view);
        window.show();
        
    }

    public static void main(String[] args) {
        launch(TextStatisticsApplication.class);
    }

}
