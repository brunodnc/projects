
public class MainProgram {

    public static void main(String[] args) {
        // write your test code here
        int[] array = {3, 1, 5, 99, 3, 12};

    }

    public static int smallest(int[] array) {
        int smallest = array[Integer.valueOf(0)];
        for (int i = 0; i < array.length; i += 1) {
            int actual = array[Integer.valueOf(i)];
            if (actual < smallest) {
                smallest = actual;
            }
        }
        return smallest;
    }

    public static int indexOfSmallest(int[] array) {
        int index = 0;
        int smallest = array[Integer.valueOf(index)];

        for (int i = 0; i < array.length; i += 1) {
            int actual = array[Integer.valueOf(i)];
            if (actual < smallest) {
                smallest = actual;
                index = i;
            }
        }
        return index;
    }
    
    public static int indexOfSmallestFrom(int[] array, int from) {
        int index = from;
        int smallest = array[Integer.valueOf(index)];

        for (int i = index; i < array.length; i += 1) {
            int actual = array[Integer.valueOf(i)];
            if (actual < smallest) {
                smallest = actual;
                index = i;
            }
        }
        return index;
    }
    
    public static void swap(int[] array, int index1, int index2) {
        int temporary = array[index1];
        array[index1] = array[index2];
        array[index2] = temporary;
    }
    
    public static void sort(int[] array) {
        
        for (int i = 0; i < array.length - 1; i += 1) {
            System.out.println(array);
            int smallestIndexInScope = indexOfSmallestFrom(array, i);
            swap(array, i, smallestIndexInScope);
        }
                
        
        
    }

}
