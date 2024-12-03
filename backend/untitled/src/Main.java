import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        Object[] data = {"a", 1, 2, 3, 4, 5, 10, "10"};

        int sum = 0;
        for(Object item : data) {
            if(item instanceof Integer) {
                sum  = sum  + (Integer)item;
            }else if (item instanceof String) {
                try {
                    sum += Integer.parseInt((String) item);
                }catch (NumberFormatException e) {}
            }
        }

        System.out.println("Sum of number is " + sum);


    }

}