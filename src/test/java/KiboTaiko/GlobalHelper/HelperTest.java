package KiboTaiko.GlobalHelper;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Usager
 */
public class HelperTest {
    
    public HelperTest() {
    }
    /**
     * Test of isNotNullOrEmpty method, of class Helper.
     */
    @Test
    public void testIsNullOrEmptyEmpty() {
        System.out.println("isNullOrEmpty");
        String word = "";
        boolean expResult = false;
        boolean result = Helper.isNotNullOrEmpty(word);
        
        assertEquals(expResult, result);
    }
    @Test
    public void testIsNullOrEmptyNull() {
        System.out.println("isNullOrEmpty");
        String word = null;
        boolean expResult = false;
        boolean result = Helper.isNotNullOrEmpty(word);
        
        assertEquals(expResult, result);
    }
    @Test
    public void testIsNullOrEmptyFull() {
        System.out.println("isNullOrEmpty");
        String word = "superTest";
        boolean expResult = true;
        boolean result = Helper.isNotNullOrEmpty(word);
        
        assertEquals(expResult, result);
    }
    
}
