package KiboTaiko.Controllers;

import KiboTaiko.Model.HomeItem;
import KiboTaiko.repositories.HomeRepo;
import java.util.List;
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
        System.out.println("HomeItemsController");

        List<HomeItem> homeItemsList = HomeRepo.getHomeItems();
        return homeItemsList;
    }

}
