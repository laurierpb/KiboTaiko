package KiboTaiko.Controllers;

import KiboTaiko.Controllers.Helper.CalendrierController_Helper;
import KiboTaiko.Model.Calendrier;
import KiboTaiko.repositories.CalendrierRepo;
import KiboTaiko.repositories.ImageRepo;
import KiboTaiko.Controllers.Interface.CalendrierController_Interface;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Calendrier")
public class CalendrierController implements CalendrierController_Interface {

    public @ResponseBody
    @Override
    List<Calendrier> getEvenement() {
        System.out.println("CalendrierController : GET");
        return CalendrierRepo.getAllCalendrier();
    }

    public @ResponseBody
    @Override
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
                ImageRepo.putImage(calendrier.getImage());
            } else {
                int imageID = ImageRepo.postImage(calendrier.getImage());
                calendrier.getImage().setID(imageID);
            }
            CalendrierRepo.updateCalendrier(calendrier);
        }
        return calendrier;
    }

    public @ResponseBody
    @Override
    Calendrier postCalendrier(
            @RequestBody Calendrier calendrier) {

        System.out.println("Calendrier Controller : POST");
        String erreurCalendrier = CalendrierController_Helper.validateCalendrier(calendrier);
        if (!erreurCalendrier.equals("")) {
            System.out.println(erreurCalendrier);
        } else {
            if (calendrier.getImage().getID() > 0) {
                ImageRepo.putImage(calendrier.getImage());
            } else {
                int imageID = ImageRepo.postImage(calendrier.getImage());
                calendrier.getImage().setID(imageID);
            }
            CalendrierRepo.insertCalendrier(calendrier);
        }
        return calendrier;
    }

    @Override
    public void deleteCalendrier(
            @PathVariable int calendrierId) {

        System.out.println("Calendrier Controller : DELETE");
        if (calendrierId <= 0) {
            System.out.println("Erreur pour le ID");
            return;
        }
        CalendrierRepo.deleteCalendrier(calendrierId);
    }
}
