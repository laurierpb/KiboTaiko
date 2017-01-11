package KiboTaiko.Controllers.Helper;

import KiboTaiko.Model.HomeItem;
import KiboTaiko.GlobalHelper.Helper;


public class HomeController_Helper {
    /**
     * Validate if the item is properly formated. 
     * @param homeItem, Object that is gona be verified
     * @return true if everything is ok or false if any of the field is wrong
    */
    public static boolean validateHomeItem(HomeItem homeItem){
        boolean retValue = true;
        
        if(Helper.isNotNullOrEmpty(homeItem.getContenue())) retValue = false;
        if(homeItem.getImage() == null) retValue = false;
        if(Helper.isNotNullOrEmpty(homeItem.getTitre())) retValue = false;
        if(homeItem.getOrder() < 0) retValue = false;
        
        return retValue;
    }
}
