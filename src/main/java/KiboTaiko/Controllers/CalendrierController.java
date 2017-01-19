package KiboTaiko.Controllers;

import KiboTaiko.Controllers.Helper.CalendrierController_Helper;
import KiboTaiko.Model.Calendrier;
import KiboTaiko.repositories.CalendrierRepo;
import KiboTaiko.repositories.ImageRepo;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Calendrier")
public class CalendrierController{

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Calendrier> getEvenement() {
        System.out.println("CalendrierController : GET");
        return CalendrierRepo.getItems();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{calendrierId}")
    public @ResponseBody
    Calendrier putCalendrier(
            @RequestBody Calendrier calendrier,
            @PathVariable int calendrierId) {

        System.out.println("Calendrier Controller : PUT");
        if (calendrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return null;
        }

        String erreurCalendrier = CalendrierController_Helper.validateCalendrier(calendrier);
        if (!erreurCalendrier.equals("")) {
            System.out.println(erreurCalendrier);
        } else {
            if (calendrier.getImage().getID() > 0) {
                ImageRepo.updateItem(calendrier.getImage());
            } else {
                int imageID = ImageRepo.insertItem(calendrier.getImage());
                calendrier.getImage().setID(imageID);
            }
            CalendrierRepo.updateItem(calendrier);
        }
        return calendrier;
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    Calendrier postCalendrier(
            @RequestBody Calendrier calendrier) {

        System.out.println("Calendrier Controller : POST");
        String erreurCalendrier = CalendrierController_Helper.validateCalendrier(calendrier);
        if (!erreurCalendrier.equals("")) {
            System.out.println(erreurCalendrier);
        } else {
            if (calendrier.getImage().getID() > 0) {
                ImageRepo.updateItem(calendrier.getImage());
            } else {
                int imageID = ImageRepo.insertItem(calendrier.getImage());
                calendrier.getImage().setID(imageID);
            }
            CalendrierRepo.insertItem(calendrier);
        }
        return calendrier;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{calendrierId}")
    public void deleteCalendrier(
            @PathVariable int calendrierId) {

        System.out.println("Calendrier Controller : DELETE");
        if (calendrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return;
        }
        CalendrierRepo.deleteItem(calendrierId);
    }
}
