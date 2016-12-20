package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.HomeItem;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class HomeRepo {
    public static List<HomeItem> getHomeItems(){
        String query = "select * from HomeItems;";
        List<HomeItem> result = Application.app.jdbcTemplate.query(query,
                (rs, rowNum) -> new HomeItem(
                    rs.getInt("ID"),
                    rs.getInt("Ordre"),
                    rs.getString("Contenue"),
                    rs.getString("Titre"),
                    rs.getString("Image"),
                    rs.getString("ImageAlt")
                )
        );
        return result;
    }
    
    public static void insertHomeItems(HomeItem homeItem){
        System.out.println(homeItem.toString());
        String query = "INSERT INTO homeitems("
            + "\"Ordre\", \"Image\", \"ImageAlt\", \"Contenue\", \"Titre\")"
            + "VALUES (?, ?, ?, ?, ?);";
        Application.app.jdbcTemplate.update(
            query,
            homeItem.getOrder(),
            homeItem.getImage(),
            homeItem.getImageAlt(),
            homeItem.getTitre(), 
            homeItem.getContenue()
        );
    }
    
    
    public static void updateHomeItems(HomeItem homeItem){
        String query = "UPDATE homeItems\n"
                + "SET Ordre = ?, image = ?, ImageAlt = ?, Titre = ?, Contenue = ?\n"
                + "WHERE id = ?;";
        Application.app.jdbcTemplate.update(
            query,
                homeItem.getOrder(),
                homeItem.getImage(),
                homeItem.getImageAlt(),
                homeItem.getTitre(), 
                homeItem.getContenue(),
                homeItem.getId()
        );
        
    }
    public static void deleteHomeItems(int id){
        String sqlString = "DELETE FROM homeitems\n"
                + "WHERE id = ?;";

        Application.app.jdbcTemplate.update(
                sqlString,
                id
        );
    }
}
