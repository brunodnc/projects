package application;

import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.layout.BorderPane;
import javafx.scene.control.Label;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.scene.layout.GridPane;
import javafx.scene.Scene;

public class MultipleViews extends Application {

    
    public void start(Stage window) {
        BorderPane bp = new BorderPane();
        Button btn = new Button("To the second view!");
        bp.setTop(new Label("First view!"));
        bp.setCenter(btn);
        Scene firstScene = new Scene(bp);
        
        VBox vb = new VBox();
        Button btn2 = new Button("To the third view!");
        vb.getChildren().addAll(btn2, new Label("Second view!"));
        Scene secondScene = new Scene(vb);
        
        GridPane gp = new GridPane();
        gp.add(new Label("Third view!"), 0, 0);
        Button btn3 = new Button("To the first view!");
        gp.add(btn3, 1, 1);
        Scene thirdScene = new Scene(gp);
        
        
        btn.setOnAction((event) -> {
            window.setScene(secondScene);
        });
        
        btn2.setOnAction((event) -> {
            window.setScene(thirdScene);
        });
        
        btn3.setOnAction((event) -> {
            window.setScene(firstScene);
        });
        
        window.setScene(firstScene);
        window.show();
        
        
        
        
    }
    public static void main(String[] args) {
        launch(MultipleViews.class);
    }

}
