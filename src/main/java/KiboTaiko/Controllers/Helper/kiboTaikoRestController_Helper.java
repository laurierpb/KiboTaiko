/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package KiboTaiko.Controllers.Helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Usager
 */
public class kiboTaikoRestController_Helper {
    public static Map generateHashMapForFotter(String name, List list, String reference){
        Map returnHash = new HashMap() {
            {
                put("name", name);
                put("list", list);
                put("reference", reference);
            }
        };
        return returnHash;
    }
}
