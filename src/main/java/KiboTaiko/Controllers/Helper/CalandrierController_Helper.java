package KiboTaiko.Controllers.Helper;

import KiboTaiko.Model.Calandrier;

public class CalandrierController_Helper {

    /**
     * valide si un calandrier est bien construit selon les stendard d'acceptation
     * de la base de données. 
     * @param cal
     * @return une string vide si le calandrier est OK
     *         une string pleine si le calandrier comporte des erreurs. 
     */
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
