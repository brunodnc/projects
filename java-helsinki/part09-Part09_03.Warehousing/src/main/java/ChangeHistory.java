/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
import java.util.ArrayList;

public class ChangeHistory {

    private ArrayList<Double> hist;

    public ChangeHistory() {
        this.hist = new ArrayList<>();
    }

    public void add(double status) {
        this.hist.add(status);
    }

    public void clear() {
        this.hist.clear();
    }

    public double maxValue() {
        if (this.hist.isEmpty()) {
            return 0.0;
        } else {
            double maxValue = this.hist.get(0);
            for (double value : this.hist) {
                if (value > maxValue) {
                    maxValue = value;
                }
            }
            return maxValue;
        }
    }

    public double minValue() {
        if (this.hist.isEmpty()) {
            return 0.0;
        } else {
            double minValue = this.hist.get(0);
            for (double value : this.hist) {
                if (value < minValue) {
                    minValue = value;
                }
            }
            return minValue;
        }
    }

    public double average() {
        if (this.hist.isEmpty()) {
            return 0.0;
        } else {
            double sum = 0.0;
            for (double value : this.hist) {
                sum += value;
            }
            return sum / this.hist.size();
        }
    }

    @Override
    public String toString() {
        return this.hist.toString();
    }

}
