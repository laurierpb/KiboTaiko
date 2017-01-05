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

    /**
     * retourne une liste de tous les home items
     *
     * @return une liste de tous les home items
     */
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    void getHomeItems() {
        System.out.println("HomeItemsController : GET");
        String dbUrl = System.getenv("JDBC_DATABASE_URL");
        
        String usernamePassword = dbUrl.split("?")[0];
        String totalUserName = usernamePassword.split("&")[0];
        String toatlPassWord = usernamePassword.split("&")[1];
        
        System.out.println("\n\n\n\n\n" + 
                "total user name : " + totalUserName +
                "total password  : " + toatlPassWord +
                "\n\n\n\n\n");
        
    }

    /**
     * Insert un nouveau home item
     *
     * @param homeItem
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public HomeItem postCalandrier(@RequestBody HomeItem homeItem) {

        if (HomeController_Helper.validateHomeItem(homeItem)) {
            System.out.println("Erreur dans l'entree du HomeItem");
        } else {
            HomeRepo.insertHomeItems(homeItem);
        }
        return homeItem;
    }

    /**
     * update un home item passé en paramètre
     *
     * @param homeItem
     * @param homeItemID
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/{homeItemID}")
    public HomeItem putCalandrier(
            @RequestBody HomeItem homeItem,
            @PathVariable int homeItemID) {

        System.out.println("HomeItem PUT : " + homeItemID);
        if (HomeController_Helper.validateHomeItem(homeItem)) {
            System.out.println("Erreur dans l'entree du HomeItem");
        } else {
            HomeRepo.updateHomeItems(homeItem);
        }
        return homeItem;
    }

    /**
     * Supprime un home item de la base de données
     *
     * @param homeItemID
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/{homeItemID}")
    public void deleteHomeItem(
            @PathVariable int homeItemID) {

        System.out.println("HomeItem DELETE : " + homeItemID);
        HomeRepo.deleteHomeItems(homeItemID);
    }
}
