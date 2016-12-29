package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.HomeItem;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class HomeRepo {

    /**
     * returne une liste de tous les home items de la base de données. 
     * @return une liste de tous les home items de la base de données. 
     */
    public static List<HomeItem> getHomeItems(){
        String query = "select * from HomeItems;";
        List<HomeItem> result = Application.app.jdbcTemplate.query(query,
                (rs, rowNum) -> new HomeItem(
                    rs.getInt("ID"),
                    rs.getInt("Ordre"),
                    rs.getString("Image"),
                    rs.getString("ImageAlt"),
                    rs.getString("Contenue"),
                    rs.getString("Titre")
                )
        );
        return result;
    }
    
    /**
     * Insert un nouveau home item qui correspond au home item passé 
     * en paramètre. 
     * @param homeItem
     */
    public static void insertHomeItems(HomeItem homeItem){
        String query = "INSERT INTO homeitems("
            + "Ordre, Image, ImageAlt, Contenue, Titre) "
            + "VALUES (?, ?, ?, ?, ?);";
        Application.app.jdbcTemplate.update(
            query,
            homeItem.getOrder(),
            homeItem.getImage(),
            homeItem.getImageAlt(),
            homeItem.getContenue(),
            homeItem.getTitre()
        );
    }
    
    /**
     * Update un home item.
     * @param homeItem
     */
    public static void updateHomeItems(HomeItem homeItem){
        String query = "UPDATE homeItems "
                + "SET Ordre = ?, Image = ?, ImageAlt = ?, Contenue = ?, Titre = ? "
                + "WHERE id = ?;";
        Application.app.jdbcTemplate.update(
            query,
                homeItem.getOrder(),
                homeItem.getImage(),
                homeItem.getImageAlt(),
                homeItem.getContenue(),
                homeItem.getTitre(), 
                homeItem.getId()
        );
        
    }
    /**
     * Delete un home item de la base de données
     * @param id
     */
    public static void deleteHomeItems(int id){
        String sqlString = "DELETE FROM homeitems\n"
                + "WHERE id = ?;";

        Application.app.jdbcTemplate.update(
                sqlString,
                id
        );
    }
}
