package KiboTaiko.GlobalHelper;

public class Helper {

    /**
     * if word parameter is null or equal to "" return false
     *
     * @param word
     * @return true if the word is null or empty
     */
    public static boolean isNotNullOrEmpty(String word) {
        return !(word == null || word.equals(""));
    }
}
