package KiboTaiko.Controllers;

import KiboTaiko.Model.HomeItem;

import KiboTaiko.Model.Calendrier;
import KiboTaiko.repositories.CalendrierRepo;
import KiboTaiko.repositories.HomeRepo;
import KiboTaiko.Controllers.Helper.kiboTaikoRestController_Helper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AllItemsName")
public class kiboTaikoRestController {

    /**
     * retourne la page d'accueil a la page de démarage
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Map> getAllItemsName() {
        List<HomeItem> homeItemList = HomeRepo.getItems();
        List<Calendrier> calendrierList = CalendrierRepo.getItems();
        ArrayList<String> listHomeItemName = new ArrayList<>();
        ArrayList<String> listCalendrierName = new ArrayList<>();
        ArrayList<Map> listRetour = new ArrayList<>();

        homeItemList.stream().forEach((homeItem) -> {
            listHomeItemName.add(homeItem.getTitre());
        });
        calendrierList.stream().forEach((calendrier) -> {
            listCalendrierName.add(calendrier.getTitre());
        });
        Map mapHomeItems = kiboTaikoRestController_Helper.generateHashMapForFotter("HomeItems", listHomeItemName, "#/");
        Map mapCalendrierItems = kiboTaikoRestController_Helper.generateHashMapForFotter("CalendrierItems", listCalendrierName, "#/Calendrier");

        listRetour.add(mapHomeItems);
        listRetour.add(mapCalendrierItems);
        return listRetour;
    }
}
