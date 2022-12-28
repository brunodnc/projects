package smiley;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.BorderPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;


public class SmileyApplication extends Application {
    
    public void start(Stage window) {
        BorderPane layout = new BorderPane();
        
        Canvas canvas = new Canvas(640, 480);
        
        layout.setCenter(canvas);
        
        GraphicsContext painter = canvas.getGraphicsContext2D();
        
        Color white = Color.WHITE;
        Color black = Color.BLACK;

        painter.setFill(white);
        painter.fill();
        
        painter.setFill(black);
        painter.fillRect(220, 50, 50, 50);
        painter.fillRect(380, 50, 50, 50);
        
        painter.fillRect(240, 240, 160, 50);
        painter.fillRect(220, 190, 50, 50);
        painter.fillRect(380, 190, 50, 50);
        
        Scene view = new Scene(layout);
        window.setScene(view);
        window.show();
        
        
    }

    public static void main(String[] args) {
        launch(SmileyApplication.class);
    }

}
