package collage;

import javafx.application.Application;
import static javafx.application.Application.launch;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.PixelReader;
import javafx.scene.image.PixelWriter;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class CollageApplication extends Application {

    @Override
    public void start(Stage stage) {

        // the example opens the image, creates a new image, and copies the opened image
        // into the new one, pixel by pixel
        Image sourceImage = new Image("file:monalisa.png");

        PixelReader imageReader = sourceImage.getPixelReader();

        int width = (int) sourceImage.getWidth();
        int height = (int) sourceImage.getHeight();

        WritableImage targetImage = new WritableImage(width, height);
        PixelWriter imageWriter = targetImage.getPixelWriter();
        
        
        int yOrigin = 0;
        int yCoordinate = 0;
        while (yCoordinate < height) {
            int xCoordinate = 0;
            int xOrigin = 0;
            while (xCoordinate < width) {
                Color color = imageReader.getColor(xCoordinate, yCoordinate);
                double red = 1 - color.getRed();
                double green = 1 - color.getGreen();
                double blue = 1 - color.getBlue();
                double opacity = color.getOpacity();

                Color newColor = new Color(red, green, blue, opacity);

                // first image
                imageWriter.setColor(xOrigin, yOrigin, newColor);
                // second
                imageWriter.setColor(( width / 2 ) + xOrigin, yOrigin, newColor);
                // third
                imageWriter.setColor(xOrigin, (height / 2) + yOrigin, newColor);
                // fourth
               imageWriter.setColor((width / 2) + xOrigin, (height / 2) + yOrigin, newColor);
                
                
                if (xCoordinate == 0) xCoordinate += 1;
                xCoordinate += 2;
                xOrigin++;
            }
            if (yCoordinate == 0) yCoordinate += 1;
            yCoordinate += 2;
            yOrigin++;
        }

        ImageView image = new ImageView(targetImage);

        Pane pane = new Pane();
        pane.getChildren().add(image);

        stage.setScene(new Scene(pane));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }

}
