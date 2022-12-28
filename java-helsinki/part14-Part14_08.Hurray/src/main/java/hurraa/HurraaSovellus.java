package hurraa;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;

public class HurraaSovellus extends Application {

    @Override
    public void start(Stage stage) throws Exception {

        BorderPane pane = new BorderPane();

        Button nappi = new Button("Hurraa!");
        pane.setCenter(nappi);

        Scene scene = new Scene(pane, 600, 400);
        nappi.setOnAction(event -> {
            try {
                playSound("Applause-Yannick_Lemieux.wav");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        });

        stage.setScene(scene);
        stage.show();
    }

    void playSound(String soundFile) throws LineUnavailableException, UnsupportedAudioFileException, IOException {
        Path path = Paths.get(soundFile);
        AudioInputStream audioIn = AudioSystem.getAudioInputStream(path.toFile().toURI().toURL());
        Clip clip = AudioSystem.getClip();
        clip.open(audioIn);
        clip.start();
    }

    public static void main(String[] args) {
        launch(args);
    }

}
