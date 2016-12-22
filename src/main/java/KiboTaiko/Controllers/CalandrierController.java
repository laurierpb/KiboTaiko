package KiboTaiko.Controllers;

import KiboTaiko.Controllers.Helper.CalandrierController_Helper;
import KiboTaiko.Model.Calandrier;
import KiboTaiko.repositories.CalandrierRepo;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Calandrier")
public class CalandrierController {
    
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Calandrier> getEvenement() {
        System.out.println("CalandrierController : GET");

        List<Calandrier> test = CalandrierRepo.getAllCalandrier();
        return test;
    }

    /**
     * /calandrier/{id}
     * @param cal = calandrier du body
     * @param calandrierId = /##
     * @return le nouveau calandrier
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/{calandrierId}")
    public @ResponseBody Calandrier postCalandrier(
            @RequestBody Calandrier cal, 
            @PathVariable int calandrierId) {
        System.out.println("Calandrier Controller : PUT");
        if (calandrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return null;
        }
        
        String erreurCalandrier = CalandrierController_Helper.validateCalandrier(cal);
        if(!erreurCalandrier.equals("")){
            System.out.println(erreurCalandrier);
        }else{
            CalandrierRepo.updateCalandrier(cal);
        }
        return cal;
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Calandrier putCalandrier(
            @RequestBody Calandrier cal) {
        
        String erreurCalandrier = CalandrierController_Helper.validateCalandrier(cal);
        if(!erreurCalandrier.equals("")){
            System.out.println(erreurCalandrier);
        }else{
            CalandrierRepo.insertCalandrier(cal);
        }
        return cal;
    }
    
    /**
     * supprime l'evenement du calandrier
     * @param calandrierId /calandrier/{calandrierID}
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{calandrierId}")
    public void deleteCalandrier(
            @PathVariable int calandrierId) {
        
        if (calandrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return;
        }
        CalandrierRepo.deleteCalandrier(calandrierId);
    }
}
