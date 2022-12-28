package application;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;

public class PartiesApplication extends Application {

    public void start(Stage window) {

        HashMap<String, ArrayList<Double>> partiesSupport = new HashMap<>();
        ArrayList<Integer> years = new ArrayList<>();
        // get data
        try {
            Scanner scanner = new Scanner(Paths.get("partiesdata.tsv"));
            String firstLine = scanner.nextLine();

            // create years array to use when setting year / percentage for each party in chart;
            String[] parts = firstLine.split("\t");
            for (int i = 1; i < parts.length; i += 1) {
                years.add(Integer.valueOf(parts[i]));
            }

            while (scanner.hasNext()) {
                String line = scanner.nextLine();

                System.out.println(line);
                String[] split = line.split("\t");
                String name = split[0];
                ArrayList<Double> values = new ArrayList<>();
                for (int i = 1; i < split.length; i += 1) {
                    if ("-".equals(split[i])) {
                        values.add(null);
                    } else {
                        values.add(Double.valueOf(split[i]));
                    }

                }
                partiesSupport.put(name, values);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        NumberAxis xAxis = new NumberAxis(1968, 2008, 4);
        xAxis.setLabel("Year");
        NumberAxis yAxis = new NumberAxis(0, 30, 5);
        yAxis.setLabel("Relative support (%)");

        LineChart<Number, Number> lineChart = new LineChart<>(xAxis, yAxis);
        lineChart.setTitle("Relative support of the parties");

        System.out.println(partiesSupport);
        partiesSupport.keySet().stream().forEach((party) -> {
            XYChart.Series data = new XYChart.Series();
            data.setName(party);
            ArrayList<Double> doubles = partiesSupport.get(party);
            for (int i = 0; i < doubles.size(); i += 1) {
                int year = years.get(i);
                Double percentage = doubles.get(i);
                if (percentage != null) {
                    data.getData().add(new XYChart.Data(year, percentage));
                }
            }
            lineChart.getData().add(data);
        });

        Scene view = new Scene(lineChart, 640, 480);
        window.setScene(view);
        window.show();
    }

    public static void main(String[] args) {
        launch(PartiesApplication.class);
    }

}
