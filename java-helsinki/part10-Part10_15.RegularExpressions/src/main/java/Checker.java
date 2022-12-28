

public class Checker {
    
    public boolean isDayOfWeek(String string) {
        if (string.matches("mon|tue|wed|thu|fri|sat|sun")) {
            return true;
        }
        return false;
    }
    
    public boolean allVowels(String string) {
        if (string.matches("[aeiou]+")) {
            return true;
        }
        return false;
    }
    
    public boolean timeOfDay(String string) {
        String[] split = string.split(":");
        if (!(split.length == 3)) {
            return false;
        }
        
        for (String time : split) {
            if (!time.matches("[0-9]{2}")) {
                return false;
            }
        }
        int hour = Integer.valueOf(split[0]);
        int min = Integer.valueOf(split[1]);
        int sec = Integer.valueOf(split[2]);
        
        
        
        if (hour < 0 || hour > 23) {
            return false;
        }
        if (min < 0 || min > 60) {
            return false;
        }
        if (sec < 0 || sec > 60) {
            return false;
        }
        return true;
    }
           

}
