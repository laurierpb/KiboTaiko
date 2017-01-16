package KiboTaiko.Controllers.Helper;

import KiboTaiko.GlobalHelper.Helper;
import KiboTaiko.Model.Calendrier;

public class CalendrierController_Helper {

    /**
     * valide si un calendrier est bien construit selon les stendard d'acceptation
     * de la base de données. 
     * @param cal
     * @return une string vide si le calendrier est OK
     *         une string pleine si le calendrier comporte des erreurs. 
     */
    public static String validateCalendrier(Calendrier cal){
        if(cal == null){
            return "Erreur, le calandrier est null";
        }
        if(!Helper.isNotNullOrEmpty(cal.getContenue())){
            return "Erreur pour le contenue";
        }
        if(cal.getImage() == null){
            return "Erreur pour le image";
        }
        if(cal.getTitre().equals("") || cal.getTitre()== null){
            return "Erreur pour le Titre";
        }
        return "";
    }
}
