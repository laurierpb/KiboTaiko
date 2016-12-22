package KiboTaiko.Controllers;

import KiboTaiko.Model.HomeItem;
import KiboTaiko.Controllers.Helper.HomeController_Helper;
import KiboTaiko.repositories.HomeRepo;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
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
        System.out.println("HomeItemsController : GET");

        List<HomeItem> homeItemsList = HomeRepo.getHomeItems();
        return homeItemsList;
    }

    @RequestMapping(method = RequestMethod.POST)
    public HomeItem postCalandrier(@RequestBody HomeItem homeItem) {
        
        if(HomeController_Helper.validateHomeItem(homeItem)){
            System.out.println("Erreur dans l'entree du HomeItem");
        }else{
            HomeRepo.insertHomeItems(homeItem);
        }
        return homeItem;
    }
    @RequestMapping(method = RequestMethod.PUT, value = "/{homeItemID}")
    public HomeItem putCalandrier(
            @RequestBody HomeItem homeItem, 
            @PathVariable int homeItemID) {
        
        System.out.println("HomeItem PUT : " + homeItemID);
        if(HomeController_Helper.validateHomeItem(homeItem)){
            System.out.println("Erreur dans l'entree du HomeItem");
        }else{
            HomeRepo.updateHomeItems(homeItem);
        }
        return homeItem;
    }
    @RequestMapping(method = RequestMethod.DELETE, value = "/{homeItemID}")
    public void deleteHomeItem(
            @PathVariable int homeItemID) {
        
        System.out.println("HomeItem PUT : " + homeItemID);
        HomeRepo.deleteHomeItems(homeItemID);
    }
}
