package ticTacToe;

import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Font;
import javafx.scene.Scene;
import java.util.ArrayList;

public class TicTacToeApplication extends Application {

    Button[][] btns = new Button[3][3];

    public void start(Stage window) {

        GridPane grid = new GridPane();
        Label turn = new Label("Turn: X");

        for (int y = 0; y < btns.length; y += 1) {
            for (int x = 0; x < btns.length; x += 1) {
                Button btn = new Button(" ");
                btn.setFont(Font.font("Monospaced", 40));
                btn.setOnAction((event) -> {
                    if (!"The end!".equals(turn.getText())) {
                        String text = turn.getText();
                        String thisTurn = text.split(" ")[1];
                        if (btn.getText().equals(" ")) {
                            if (thisTurn.equals("X")) {
                                btn.setText("X");
                                turn.setText("Turn: O");
                            } else {
                                btn.setText("O");
                                turn.setText("Turn: X");
                            }
                        }
                        boolean check = checkEnd();
                        if (check) {
                            turn.setText("The end!");
                        };
                    }
                });

                this.btns[y][x] = btn;
                grid.add(btns[y][x], y, x);
            }
        }

        BorderPane layout = new BorderPane();

        layout.setTop(turn);
        layout.setCenter(grid);

        Scene view = new Scene(layout);
        window.setScene(view);
        window.show();
    }

    public static void main(String[] args) {
        launch(TicTacToeApplication.class);
    }

    private boolean checkEnd() {
        String row = "";
        String col = "";
        String diagLeftToRight = "";
        String diagRightToLeft = "";

        for (int y = 0; y < btns.length; y += 1) {
            for (int x = 0; x < btns.length; x += 1) {
                if (x == y) {
                    diagLeftToRight += btns[y][x].getText();
                }
                if (x + y == 2) {
                    diagRightToLeft += btns[y][x].getText();
                }
                row += btns[y][x].getText();
                col += btns[x][y].getText();
            }
            if (row.equals("XXX") || row.equals("OOO")) {
                return true;
            }
            if (col.equals("XXX") || col.equals("OOO")) {
                return true;
            }
            if (diagLeftToRight.equals("XXX") || diagLeftToRight.equals("OOO")) {
                return true;
            }
            if (diagRightToLeft.equals("XXX") || diagRightToLeft.equals("OOO")) {
                return true;
            }
            row = "";
            col = "";
        }
        for (int y = 0; y < btns.length; y += 1) {
            for (int x = 0; x < btns.length; x += 1) {
                if (btns[y][x].getText().equals(" ")) {
                    return false;
                }
            }
        }
        return true;
    }

}
