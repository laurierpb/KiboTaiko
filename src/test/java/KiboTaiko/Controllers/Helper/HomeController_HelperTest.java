package KiboTaiko.Controllers.Helper;

import KiboTaiko.Model.HomeItem;
import java.util.Arrays;
import org.junit.Test;
import KiboTaiko.Model.Image;
import static org.junit.Assert.*;


public class HomeController_HelperTest {
    
    public HomeController_HelperTest() {
    }
    /**
     * Test of validateHomeItem method, of class HomeController_Helper.
     * 
     * Test order -> order == 3
     * Test order -> order < 0
     * Test order -> order > 9
     * Test order -> order == null
     * 
     * Test image -> validateImage() == true;
     * Test image -> validateImage() == false;
     * 
     * Test contenue -> contenue == "contenue"
     * Test contenue -> contenue == ""
     * Test contenue -> contenue == null
     * 
     * Test titre -> titre == "Titre"
     * Test titre -> titre == ""
     * Test titre -> titre == null
     */
    @Test
    public void testValidateHomeItem() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = null;
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    
    @Test
    public void testValidateHomeItemOrder1() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setOrder(3);
        boolean expResult = true;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemOrder2() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setOrder(-1);
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemOrder3() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setOrder(10);
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemOrder4() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setOrder((int)Double.NaN);
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    
    
    
    
    @Test
    public void testValidateHomeItemImage() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setImage(null);
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemImage2() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        
        boolean expResult = true;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    
    
    
    
    @Test
    public void testValidateHomeItemContenue() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setContenue("contenue");
        boolean expResult = true;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemContenue2() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setContenue("");
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemContenue3() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setContenue(null);
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    
    
    
    
    @Test
    public void testValidateHomeItemTitre() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setTitre("titre");
        boolean expResult = true;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemTitre2() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setTitre("");
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    @Test
    public void testValidateHomeItemTitre3() {
        System.out.println("validateHomeItem");
        HomeItem homeItem = generateValidNewHomeItem();
        homeItem.setTitre(null);
        
        boolean expResult = false;
        boolean result = HomeController_Helper.validateHomeItem(homeItem);
        assertEquals(expResult, result);
    }
    
    
    private HomeItem generateValidNewHomeItem(){
        byte[] bytes = new byte[100];
        Arrays.fill(bytes, (byte) 0);
        HomeItem hi = new HomeItem(10,
                3,
                new Image(1,
                        bytes,
                        "TestImageName",
                        "TestImageAlt"),
                "Contenue",
                "TestTitre"
        );
        return hi;
    }
}
