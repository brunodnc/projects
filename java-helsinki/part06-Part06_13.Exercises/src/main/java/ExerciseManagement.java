
import java.util.ArrayList;

public class ExerciseManagement {

    private ArrayList<Exercise> exercises;

    public ExerciseManagement() {
        this.exercises = new ArrayList<>();
    }

    public ArrayList<Exercise> exerciseList() {
        return this.exercises;
    }

    public void add(String s) {
        this.exercises.add(new Exercise(s));
    }

    public void markAsCompleted(String s) {
        for (Exercise exercise : this.exercises) {
            if (exercise.getName().equals(s)) {
                exercise.complete();
            }
        }
    }

    public boolean isCompleted(String s) {
        for (Exercise exercise : this.exercises) {
            if (exercise.getName().equals(s)) {
                return exercise.getCompleted();
            }
        }
        return false;
    }
}
