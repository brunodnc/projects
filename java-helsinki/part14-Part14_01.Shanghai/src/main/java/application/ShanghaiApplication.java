package application;

import java.util.HashMap;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.stage.Stage;

public class ShanghaiApplication extends Application {

    public void start(Stage window) {

        NumberAxis xAxis = new NumberAxis(2007, 2017, 2);
        NumberAxis yAxis = new NumberAxis(0, 100, 10);

        xAxis.setLabel("Year");
        yAxis.setLabel("Ranking");

        LineChart<Number, Number> shangaiRank = new LineChart<>(xAxis, yAxis);
        shangaiRank.setTitle("University of Helsinki, Shangai ranking");

        XYChart.Series chartData = new XYChart.Series();
        chartData.setName("Position by year of Helsinki in Shangai Ranking");

        // Non manual alternative:
        //String rawData = "2007 73;2008 68;2009 72;2010 72;2011 74;2012 73;2013 76;2014 73;2015 67;2016 56;2017 56";
        // HashMap<Integer, Double> mappedData = mapData(rawData);
        // mappedData.forEach((a, b) -> {
        //    System.out.println("a: " + a);
        //    System.out.println("b: " + b);
        //    chartData.getData().add(new XYChart.Data(a, b));
        //        });
        // manual:
        chartData.getData().add(new XYChart.Data(2007, 73));
        chartData.getData().add(new XYChart.Data(2008, 68));
        chartData.getData().add(new XYChart.Data(2009, 72));
        chartData.getData().add(new XYChart.Data(2010, 72));
        chartData.getData().add(new XYChart.Data(2011, 74));
        chartData.getData().add(new XYChart.Data(2012, 73));
        chartData.getData().add(new XYChart.Data(2013, 76));
        chartData.getData().add(new XYChart.Data(2014, 73));
        chartData.getData().add(new XYChart.Data(2015, 67));
        chartData.getData().add(new XYChart.Data(2016, 56));
        chartData.getData().add(new XYChart.Data(2017, 56));

        shangaiRank.getData().add(chartData);
        Scene view = new Scene(shangaiRank, 640, 480);
        window.setScene(view);
        window.show();
    }

    //private HashMap<Integer, Double> mapData(String data) {
    //    HashMap<Integer, Double> mappedData = new HashMap<>();
    //    String[] entries = data.split(";");
    //    for (String entry : entries) {
    //        String[] splittedEntry = entry.split(" ");
    //        int year = Integer.valueOf(splittedEntry[0]);
    //        double percentage = Double.valueOf(splittedEntry[1]);
    //        mappedData.put(year, percentage);
    //    }
    //    return mappedData;
    // }
    public static void main(String[] args) {
        launch(ShanghaiApplication.class);
    }

}
