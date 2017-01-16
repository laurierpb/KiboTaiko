package KiboTaiko.Controllers.Helper;

import KiboTaiko.GlobalHelper.Helper;
import KiboTaiko.Model.Image;


public class ImageController_Helper {
    
    /**
     * return true if the image passed in parameter is properly formed
     * @param image
     * @return
     */
    public static boolean validteImage(Image image){
        boolean returnValue = true;
        if(image == null) return false;
        if(image.getImage() == null)returnValue = false;
        if(Helper.isNotNullOrEmpty(image.getImageAlt()))returnValue = false;
        if(Helper.isNotNullOrEmpty(image.getName()))returnValue = false;
        
        return returnValue;
    }
}
