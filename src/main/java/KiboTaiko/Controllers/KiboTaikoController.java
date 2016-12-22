package KiboTaiko.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class KiboTaikoController {

    /**
     * retourne la page d'accueil a la page de démarage
     * @return
     */
    @RequestMapping("/")
    public String home() {
        return "KiboTaiko";
    }
}