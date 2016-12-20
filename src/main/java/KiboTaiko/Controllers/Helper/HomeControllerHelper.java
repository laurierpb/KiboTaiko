package KiboTaiko.Controllers.Helper;

import KiboTaiko.Model.HomeItem;



public class HomeControllerHelper {
    /**
     * Validate if the item is properly formated. 
     * @param homeItem, Object that is gona be verified
     * @return true if everything is ok or false if any of the field is wrong
    */
    public static boolean validateHomeItem(HomeItem homeItem){
        boolean retValue = true;
        
        if(isNullOrEmpty(homeItem.getContenue())) retValue = false;
        if(isNullOrEmpty(homeItem.getImage())) retValue = false;
        if(isNullOrEmpty(homeItem.getImageAlt())) retValue = false;
        if(isNullOrEmpty(homeItem.getTitre())) retValue = false;
        if(homeItem.getOrder() < 0) retValue = false;
        
        return retValue;
    }
    /**
     * if word parameter is null or equal to "" return false
     * @param word
     * @return 
     */
    private static boolean isNullOrEmpty(String word){
        return !(word == null || word.equals(""));
    }
}
