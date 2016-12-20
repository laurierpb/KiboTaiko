package KiboTaiko.Controllers;

import KiboTaiko.Model.HomeItem;
import KiboTaiko.Controllers.Helper.HomeControllerHelper;
import KiboTaiko.repositories.HomeRepo;
import java.util.List;
import jdk.nashorn.internal.runtime.regexp.RegExpFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/HomeItems")
public class HomeItemsController {

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<HomeItem> getHomeItems() {
        System.out.println("HomeItemsController : Get");

        List<HomeItem> homeItemsList = HomeRepo.getHomeItems();
        return homeItemsList;
    }

    @RequestMapping(method = RequestMethod.POST)
    public HomeItem putCalandrier(@RequestBody HomeItem homeItem) {
        if(HomeControllerHelper.validateHomeItem(homeItem)){
            System.out.println("Erreur dans l'entree du HomeItem");
        }else{
            HomeRepo.insertHomeItems(homeItem);
        }
        return homeItem;
    }
}
