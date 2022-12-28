package notifier;

import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.layout.VBox;
import javafx.scene.control.TextField;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.Scene;

public class NotifierApplication extends Application {

    @Override
    public void start(Stage window) {

        VBox vbox = new VBox();

        TextField tf = new TextField();

        Button btn = new Button("Update");

        Label label = new Label("");

        vbox.setSpacing(10);
        vbox.getChildren().addAll(tf, btn, label);

        btn.setOnAction((event) -> {
            label.setText(tf.getText());
                    });

        Scene view = new Scene(vbox);
        window.setScene(view);
        window.show();
    }

    public static void main(String[] args) {
        launch(NotifierApplication.class);
    }

}
