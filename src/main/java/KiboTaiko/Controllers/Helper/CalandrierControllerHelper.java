package KiboTaiko.Controllers.Helper;

import KiboTaiko.Model.Calandrier;

public class CalandrierControllerHelper {
    public static String validateCalandrier(Calandrier cal){
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
}
