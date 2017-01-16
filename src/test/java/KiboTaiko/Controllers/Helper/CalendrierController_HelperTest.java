/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package KiboTaiko.Controllers.Helper;

import KiboTaiko.Model.Calendrier;
import KiboTaiko.Model.Image;
import java.util.Arrays;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Usager
 */
public class CalendrierController_HelperTest {

    public CalendrierController_HelperTest() {
    }

    /**
     * Test of validateCalendrier method, of class CalendrierController_Helper.
     */
    @Test
    public void testValidateCalendrier() {
        System.out.println("validateCalendrier : Contenue");
        byte[] bytes = new byte[100];
        Arrays.fill(bytes, (byte) 0);
        Calendrier cal = new Calendrier(1,
                new Image(1,
                        bytes,
                        "TestImageName",
                        "TestImageAlt"),
                "ContenueTest",
                "TestTitre"
        );

        String expResult = "";
        String result = CalendrierController_Helper.validateCalendrier(cal);
        assertEquals(expResult, result);
    }

    @Test
    public void testValidateCalendrierImageNull() {
        System.out.println("validateCalendrier : Contenue");
        byte[] bytes = new byte[100];
        Arrays.fill(bytes, (byte) 0);
        Calendrier cal = new Calendrier(1,
                null,
                "ContenueTest",
                "TestTitre"
        );

        String expResult = "Erreur pour le image";
        String result = CalendrierController_Helper.validateCalendrier(cal);
        assertEquals(expResult, result);
    }

    @Test
    public void testValidateCalendrierNull() {
        System.out.println("validateCalendrier : null");
        Calendrier cal = null;
        String expResult = "Erreur, le calandrier est null";
        String result = CalendrierController_Helper.validateCalendrier(cal);
        assertEquals(expResult, result);
    }

    @Test
    public void testValidateCalendrierContenue() {
        System.out.println("validateCalendrier : Contenue");
        byte[] bytes = new byte[100];
        Arrays.fill(bytes, (byte) 0);
        Calendrier cal = new Calendrier(1,
                new Image(1,
                        bytes,
                        "TestImageName",
                        "TestImageAlt"),
                null,
                "TestTitre"
        );
        String expResult = "Erreur pour le contenue";
        String result = CalendrierController_Helper.validateCalendrier(cal);
        assertEquals(expResult, result);
    }

    @Test
    public void testValidateCalendrierContenue2() {
        System.out.println("validateCalendrier : Contenue");
        byte[] bytes = new byte[100];
        Arrays.fill(bytes, (byte) 0);
        Calendrier cal = new Calendrier(1,
                new Image(1,
                        bytes,
                        "TestImageName",
                        "TestImageAlt"),
                "",
                "TestTitre"
        );
        String expResult = "Erreur pour le contenue";
        String result = CalendrierController_Helper.validateCalendrier(cal);
        assertEquals(expResult, result);
    }
}
