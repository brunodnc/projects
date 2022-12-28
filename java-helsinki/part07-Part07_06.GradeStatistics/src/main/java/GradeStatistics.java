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

public class GradeStatistics {

    private ArrayList<Integer> points;
    private ArrayList<Integer> grades;

    public GradeStatistics() {
        this.points = new ArrayList<>();
        this.grades = new ArrayList<>();
    }

    public void add(int value) {
        if (value >= 0 && value <= 100) {
            this.points.add(value);
            this.grades.add(pointToGrade(value));
        }
    }

    public double averagePoints() {
        int sum = 0;
        for (int point : this.points) {
            sum += point;
        }
        return (double) sum / points.size();
    }

    public double passingAverage(int minimum) {
        int sum = 0;
        int count = 0;
        for (int point : this.points) {
            if (point >= minimum) {
                sum += point;
                count += 1;
            }
        }
        if (count == 0) {
            return -1;
        }
        return (double) sum / count;
    }

    public double passingPercentage(int minimum) {
        int passing = 0;
        for (int point : this.points) {
            if (point >= minimum) {
                passing += 1;
            }
        }
        return (double) 100 * passing / this.points.size();
    }

    public int pointToGrade(double point) {
        int grade = 0;
        if (point < 50) {
            return grade;
        } else if (point < 60) {
            grade = 1;
            return grade;
        } else if (point < 70) {
            grade = 2;
            return grade;
        } else if (point < 80) {
            grade = 3;
            return grade;
        } else if (point < 90) {
            grade = 4;
            return grade;
        } else {
            grade = 5;
            return grade;
        }
    }

    public String stars(int number) {
        String starString = " ";

        for (int grade : this.grades) {
            if (grade == number) {
                starString += "*";
            }
        }
        return starString;
    }
}
