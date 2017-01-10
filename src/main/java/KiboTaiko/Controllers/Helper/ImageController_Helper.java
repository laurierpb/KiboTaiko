package KiboTaiko.Controllers.Helper;

import KiboTaiko.GlobalHelper.Helper;
import KiboTaiko.Model.Image;


public class ImageController_Helper {
    
    /**
     * return true if the image passed in parameter is properly formed
     * @param image
     * @return
     */
    public boolean isImageOk(Image image){
        boolean returnValue = true;
        
        if(image.getImage() == null)returnValue = false;
        if(Helper.isNullOrEmpty(image.getImageAlt()))returnValue = false;
        if(Helper.isNullOrEmpty(image.getName()))returnValue = false;
        
        return returnValue;
    }
}
