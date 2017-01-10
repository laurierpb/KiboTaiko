package KiboTaiko.Controllers;

import KiboTaiko.Model.HomeItem;
import KiboTaiko.Controllers.Helper.HomeController_Helper;
import KiboTaiko.repositories.HomeRepo;
import KiboTaiko.repositories.ImageRepo;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/HomeItems")
public class HomeItemsController {
    
    /**
     * retourne une liste de tous les home items
     * @return une liste de tous les home items
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<HomeItem> getHomeItems() {
        System.out.println("HomeItemsController : GET");

        List<HomeItem> homeItemsList = HomeRepo.getHomeItems();
        return homeItemsList;
    }
    
    /**
     * Insert un nouveau home item
     * @param homeItem
     * @return 
     */
    @RequestMapping(method = RequestMethod.POST)
    public HomeItem postCalendrier(@RequestBody HomeItem homeItem) {
        
        if(HomeController_Helper.validateHomeItem(homeItem)){
            System.out.println("Erreur dans l'entree du HomeItem");
        }else{
            if(homeItem.getImage().getID() > 0){
                ImageRepo.putImage(homeItem.getImage());
            }else{
                int imageID = ImageRepo.postImage(homeItem.getImage());
                homeItem.getImage().setID(imageID);
            }
            HomeRepo.updateHomeItems(homeItem);
        }
        return homeItem;
    }
    
    /**
     * update un home item passé en paramètre et l'image qui lui est associé 
     * si besoin. 
     * @param homeItem
     * @param homeItemID
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/{homeItemID}")
    public HomeItem putCalendrier(
            @RequestBody HomeItem homeItem, 
            @PathVariable int homeItemID) {
        
        System.out.println("HomeItem PUT : " + homeItemID);
        if(HomeController_Helper.validateHomeItem(homeItem)){
            System.out.println("Erreur dans l'entree du HomeItem");
        }else{
            if(homeItem.getImage().getID() > 0){
                ImageRepo.putImage(homeItem.getImage());
            }else{
                int imageID = ImageRepo.postImage(homeItem.getImage());
                homeItem.getImage().setID(imageID);
            }
            HomeRepo.updateHomeItems(homeItem);
        }
        return homeItem;
    }
    
    /** 
     * Supprime un home item de la base de données
     * @param homeItemID
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{homeItemID}")
    public void deleteHomeItem(
            @PathVariable int homeItemID) {
        
        System.out.println("HomeItem DELETE : " + homeItemID);
        HomeRepo.deleteHomeItems(homeItemID);
    }
}
