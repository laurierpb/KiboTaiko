package KiboTaiko.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class KiboTaikoController {

    @RequestMapping("/")
    public String home() {
        System.out.println("Home KiboTaiko");
        return "KiboTaiko";
    }
}