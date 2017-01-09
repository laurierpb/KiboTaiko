package KiboTaiko.Controllers;

import KiboTaiko.Controllers.Helper.CalendrierController_Helper;
import KiboTaiko.Model.Calendrier;
import KiboTaiko.repositories.CalendrierRepo;
import KiboTaiko.repositories.ImageRepo;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Calendrier")
public class CalendrierController {

    /**
     * Retourne une liste de calendrier.
     *
     * @return calendrierList
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Calendrier> getEvenement() {
        System.out.println("CalendrierController : GET");
        List<Calendrier> calendrierList = CalendrierRepo.getAllCalendrier();
        return calendrierList;
    }

    /**
     * /calendrier/{id}
     *
     * @param cal = calendrier du body
     * @param calendrierId = calendrier/{calendrierId}
     * @return le nouveau calendrier
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/{calendrierId}")
    public @ResponseBody
    Calendrier putCalendrier(
            @RequestBody Calendrier cal,
            @PathVariable int calendrierId) {
        System.out.println("Calendrier Controller : PUT");
        if (calendrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return null;
        }

        String erreurCalendrier = CalendrierController_Helper.validateCalendrier(cal);
        if (!erreurCalendrier.equals("")) {
            System.out.println(erreurCalendrier);
        } else {
            CalendrierRepo.updateCalendrier(cal);
            if(cal.getImage().getID() > 0){
                ImageRepo.putImage(cal.getImage());
            }else{
                ImageRepo.postImage(cal.getImage());
            }
        }
        return cal;
    }

    /**
     * Ajoute un calendrier.
     *
     * @param calendrier
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    Calendrier postCalendrier(
            @RequestBody Calendrier calendrier) {

        String erreurCalendrier = CalendrierController_Helper.validateCalendrier(calendrier);
        if (!erreurCalendrier.equals("")) {
            System.out.println(erreurCalendrier);
        } else {
            CalendrierRepo.insertCalendrier(calendrier);
            if(calendrier.getImage().getID() > 0){
                ImageRepo.putImage(calendrier.getImage());
            }else{
                ImageRepo.postImage(calendrier.getImage());
            }
        }
        return calendrier;
    }

    /**
     * supprime l'evenement du calendrier
     *
     * @param calendrierId /calendrier/{calendrierID}
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{calendrierId}")
    public void deleteCalendrier(
            @PathVariable int calendrierId) {

        if (calendrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return;
        }
        CalendrierRepo.deleteCalendrier(calendrierId);
    }
}
