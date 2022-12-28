package application;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class SavingsCalculatorApplication extends Application {

    public void start(Stage window) {
        BorderPane layout = new BorderPane();

        NumberAxis xAxis = new NumberAxis(0, 30, 1);
        xAxis.setLabel("");
        NumberAxis yAxis = new NumberAxis();
        yAxis.setLabel("");

        LineChart<Number, Number> lineChart = new LineChart(xAxis, yAxis);
        lineChart.setTitle("Savings calculator");
        

        VBox vbox = new VBox();
        BorderPane monthlySavings = new BorderPane();
        BorderPane yearlyInterestRate = new BorderPane();
        vbox.getChildren().addAll(monthlySavings, yearlyInterestRate);

        Slider savingsSlider = new Slider(25, 250, 25);
        savingsSlider.setSnapToTicks(true);
        savingsSlider.setBlockIncrement(500);
        savingsSlider.setShowTickMarks(true);
        savingsSlider.setShowTickLabels(true);

        monthlySavings.setLeft(new Label("Monthly savings"));
        monthlySavings.setCenter(savingsSlider);
        Label savingsLabel = new Label("" + savingsSlider.getValue());
        monthlySavings.setRight(savingsLabel);
        monthlySavings.setPadding(new Insets(10));

        Slider interestSlider = new Slider(0, 10, 1);
        interestSlider.setMinorTickCount(10);
        interestSlider.setShowTickLabels(true);
        interestSlider.setShowTickMarks(true);
        
        yearlyInterestRate.setLeft(new Label("Yearly interest rate"));
        yearlyInterestRate.setCenter(interestSlider);
        Label interestLabel = new Label("" + interestSlider.getValue());
        yearlyInterestRate.setRight(interestLabel);

        XYChart.Series savingsSeries = new XYChart.Series();
        savingsSeries.setName("Savings");
        XYChart.Series interestSeries = new XYChart.Series();
        interestSeries.setName("Savings with interest");
        lineChart.getData().add(savingsSeries);
        lineChart.getData().add(interestSeries);
        
        updateSavings(savingsSlider.getValue(), interestSlider.getValue(), savingsSeries, interestSeries);

        savingsSlider.valueProperty().addListener((observable, oldValue, newValue) -> {
            savingsLabel.setText("" + newValue);
            updateSavings(savingsSlider.getValue(), interestSlider.getValue(), savingsSeries, interestSeries);
        });

        interestSlider.valueProperty().addListener((observable, oldValue, newValue) -> {
            interestLabel.setText("" + newValue);
            updateSavings(savingsSlider.getValue(), interestSlider.getValue(), savingsSeries, interestSeries);
        });

        layout.setTop(vbox);
        layout.setCenter(lineChart);

        Scene view = new Scene(layout);
        window.setScene(view);
        window.show();
    }

    private void  updateSavings(double savings, double interest,  XYChart.Series savingsSeries, XYChart.Series interestSeries) {
        savingsSeries.getData().clear();
        interestSeries.getData().clear();
        
        double sav = 0.0;
        double intr = 0.0;
        
        for (int i = 0; i < 30; i += 1) {
            savingsSeries.getData().add(new XYChart.Data(i, sav));
            sav += savings * 12;
            
            interestSeries.getData().add(new XYChart.Data(i, intr));
            intr = (intr + savings * 12) * (1.0 + interest / 100.0);
        }
    }

    public static void main(String[] args) {
        launch(SavingsCalculatorApplication.class);
    }

}
