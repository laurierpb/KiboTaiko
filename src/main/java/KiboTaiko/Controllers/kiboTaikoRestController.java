package KiboTaiko.Controllers;

import KiboTaiko.Model.HomeItem;;
import KiboTaiko.Model.Calendrier;
import KiboTaiko.repositories.CalendrierRepo;
import KiboTaiko.repositories.HomeRepo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/AllItemsName")
public class kiboTaikoRestController {

    /**
     * retourne la page d'accueil a la page de démarage
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<Map> getAllItemsName() {
        List<HomeItem> homeItemList = HomeRepo.getHomeItems();
        List<Calendrier> calendrierList = CalendrierRepo.getAllCalendrier();
        ArrayList<String> listHomeItemName = new ArrayList<>();
        ArrayList<String> listCalendrierName = new ArrayList<>();
        ArrayList<Map> listRetour = new ArrayList<>();
        homeItemList.stream().forEach((homeItem) -> {
            listHomeItemName.add(homeItem.getTitre());
        });
        calendrierList.stream().forEach((calendrier) -> {
            listCalendrierName.add(calendrier.getTitleText());
        });
        Map mapHomeItems = new HashMap() {
            {
                put("name", "HomeItems");
                put("list", listHomeItemName);
                put("reference", "#/");
            }
        };
        Map mapCalendrierItems = new HashMap() {
            {
                put("name", "CalendrierItems");
                put("list", listCalendrierName);
                put("reference", "#/Calendrier");
            }
        };
        
        
        listRetour.add(mapHomeItems);
        listRetour.add(mapCalendrierItems);
        return listRetour;
    }
}
