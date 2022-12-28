/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package application;

/**
 *
 * @author admin
 */
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class AverageSensor implements Sensor {

    private ArrayList<Sensor> sensors;
    private List<Integer> readingsList;

    public AverageSensor() {
        this.sensors = new ArrayList<>();
        this.readingsList = new ArrayList<>();
    }

    @Override
    public boolean isOn() {
        return this.sensors
                .stream()
                .map(s -> s.isOn())
                .reduce(true, (init, cur) -> init && cur ? true : false);
    }

    @Override
    public int read() {
        int sum = 0;

        for (Sensor s : this.sensors) {
            sum += s.read();
        }
        
        
        int average = sum / this.sensors.size();
        this.readingsList.add(average);
        return average;

    }

    @Override
    public void setOff() {
        if (!this.isOn() || this.sensors.isEmpty()) {
            throw new IllegalStateException();
        }
        Iterator<Sensor> iterator = this.sensors.iterator();
        while (iterator.hasNext()) {
            Sensor current = iterator.next();
            current.setOff();
        }
    }

    @Override
    public void setOn() {
        Iterator<Sensor> iterator = this.sensors.iterator();
        while (iterator.hasNext()) {
            Sensor current = iterator.next();
            current.setOn();
        }
    }

    public void addSensor(Sensor toAdd) {
        this.sensors.add(toAdd);
    }

    public List<Integer> readings() {
        return this.readingsList;
    }

}
