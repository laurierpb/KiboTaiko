package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.HomeItem;
import KiboTaiko.repositories.tools.Helper;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class HomeRepo {

    /**
     * returne une liste de tous les home items de la base de données. 
     * @return une liste de tous les home items de la base de données. 
     */
    public static List<HomeItem> getHomeItems(){
        try {
        Connection connection = Helper.getConnection();
        Statement stmt = connection.createStatement();
        String query = "select * from HomeItems;";
        ResultSet rs = stmt.executeQuery(query);
            System.out.println("\n\n\n\n\nResult Set : "+rs.toString()+"\n\n\n\n\n");
        StringBuilder sb = new StringBuilder();
        List homeItems = new ArrayList<>();
        while (rs.next()) {
            int id = rs.getInt("id");
            int order = rs.getInt("order");
            String contenue = rs.getString("contenue");
            String titre = rs.getString("titre");
            String image = rs.getString("image");
            String imageAlt = rs.getString("imageAlt");
            
            homeItems.add(new HomeItem(id, order, contenue, titre, image, imageAlt));
        }
        
        return homeItems;
    } catch (Exception e) {
        return new ArrayList<>();
    }
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
