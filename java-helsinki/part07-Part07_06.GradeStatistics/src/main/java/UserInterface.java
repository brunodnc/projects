/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author admin
 */
import java.util.Scanner;

public class UserInterface {

    private Scanner scanner;
    private GradeStatistics gs;
    private int minimumPassingGrade;

    public UserInterface(Scanner scanner, GradeStatistics gs) {
        this.scanner = scanner;
        this.gs = gs;
        this.minimumPassingGrade = 50;
    }

    public void start() {
        while (true) {
            System.out.println("Enter points totals, -1 stops:");
            int point = Integer.valueOf(scanner.nextLine());
            if (point == -1) {
                this.printAverage();
                this.printPassingAverage();
                this.printPassPercentage();
                this.printGradeDistribution();
                break;
            }
            this.gs.add(point);
        }

    }

    public void printAverage() {
        System.out.println("Point average (all): " + this.gs.averagePoints());
    }

    public void printPassingAverage() {
        double passingAverage = gs.passingAverage(50);
        if (passingAverage == (double) -1) {
            System.out.println("Point average (passing): -");
        } else {
            System.out.println("Point average (passing): " + this.gs.passingAverage(minimumPassingGrade));
        }
    }

    public void printPassPercentage() {
        System.out.println("Pass percentage: " + this.gs.passingPercentage(minimumPassingGrade));
    }
    
    public void printGradeDistribution() {
        System.out.println("Grade distribution:");
        System.out.println("5:" + this.gs.stars(5));
        System.out.println("4:" + this.gs.stars(4));
        System.out.println("3:" + this.gs.stars(3));
        System.out.println("2:" + this.gs.stars(2));
        System.out.println("1:" + this.gs.stars(1));
        System.out.println("0:" + this.gs.stars(0));
    }

}
