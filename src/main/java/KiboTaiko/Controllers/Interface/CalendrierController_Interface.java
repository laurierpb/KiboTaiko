package KiboTaiko.Controllers.Interface;

import KiboTaiko.Model.Calendrier;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Calendrier")
public interface CalendrierController_Interface {
    /**
     * Retourne une liste de calendrier.
     *
     * @return une liste de calendrier
     */
    @RequestMapping(method = RequestMethod.GET)
    List<Calendrier> getEvenement();

    /**
     * /calendrier/{id}
     *
     * @param calendrier = calendrier du body
     * @param calendrierId = calendrier/{calendrierId}
     * @return le nouveau calendrier
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/{calendrierId}")
    public @ResponseBody Calendrier putCalendrier(
            @RequestBody Calendrier calendrier,@PathVariable int calendrierId);

    /**
     * Ajoute un calendrier.
     *
     * @param calendrier
     * @return le nouveau calendrier
     */
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    Calendrier postCalendrier(@RequestBody Calendrier calendrier);

    /**
     * supprime l'evenement du calendrier
     *
     * @param calendrierId /calendrier/{calendrierID}
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{calendrierId}")
    public void deleteCalendrier(@PathVariable int calendrierId);
}
