package KiboTaiko.Controllers;

import KiboTaiko.Model.Calandrier;
import KiboTaiko.repositories.CalandrierRepo;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Calandrier")
public class CalandrierController {
    
    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<Calandrier> getEvenement() {
        System.out.println("CalandrierController");

        List<Calandrier> test = CalandrierRepo.getAllCalandrier();
        return test;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Calandrier postCalandrier(@RequestBody Calandrier cal) {
        System.out.println("\nPost     : Calandrier");

        if (cal.getId() <= 0) {
            System.out.println("Erreur pour le ID");
            return null;
        }
        
        String erreurCalandrier = validateCalandrier(cal);
        if(!erreurCalandrier.equals("")){
            System.out.println(erreurCalandrier);
        }else{
            CalandrierRepo.updateCalandrier(cal);
        }
        return cal;
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public Calandrier putCalandrier(@RequestBody Calandrier cal) {
        System.out.println("\nPut     : Calandrier");
        
        String erreurCalandrier = validateCalandrier(cal);
        if(!erreurCalandrier.equals("")){
            System.out.println(erreurCalandrier);
        }else{
            CalandrierRepo.insertCalandrier(cal);
        }
        return cal;
    }
    
    private String validateCalandrier(Calandrier cal){
        if(cal.getContenue().equals("") || cal.getContenue() == null){
            return "Erreur pour le contenue";
        }
        if(cal.getImage().equals("") || cal.getImage() == null){
            return "Erreur pour le image";
        }
        if(cal.getImageAlt().equals("") || cal.getImageAlt()== null){
            return "Erreur pour le Alt";
        }
        if(cal.getTitleText().equals("") || cal.getTitleText()== null){
            return "Erreur pour le Titre";
        }
        return "";
    }
    
    @RequestMapping(method = RequestMethod.DELETE)
    public void deleteCalandrier(@RequestBody int id) {
        System.out.println("\nDelete     : Calandrier");

        if (id <= 0) {
            System.out.println("Erreur pour le ID");
            return;
        }
        
        CalandrierRepo.deleteCalandrier(id);
    }
}
