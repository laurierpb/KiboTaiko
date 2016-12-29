package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.Calandrier;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class CalandrierRepo {

    /**
     * retourne une liste de tous les calandrier présent dans la base de données. 
     * @return une liste de tous les calandrier dans la base de données. 
     */
    public static List<Calandrier> getAllCalandrier() {
        String query = "select * from calandrier;";

        List<Calandrier> result = Application.app.jdbcTemplate.query(query,
                (rs, rowNum) -> new Calandrier(
                        rs.getInt("id"),
                        rs.getString("image"),
                        rs.getString("imageAlt"),
                        rs.getString("contenue"),
                        rs.getString("titleText")
                )
        );
        return result;
    }

    /**
     * Update le calandrier qui correspond au calandrier passé en paramêtre
     * @param cal calandrier
     */
    public static void updateCalandrier(Calandrier cal) {
        String sqlString = "UPDATE calandrier\n"
                + "SET Image = ?, ImageAlt = ?, Contenue = ?, TitleText = ?\n"
                + "WHERE Id = ?;";
        Application.app.jdbcTemplate.update(
                sqlString,
                cal.getImage(),
                cal.getImageAlt(),
                cal.getContenue(),
                cal.getTitleText(),
                cal.getId()
        );
    }
    
    /**
     * Supprime un calandrier de la base de données par rapport au ID passé
     * en paramêtre. 
     * @param id
     */
    public static void deleteCalandrier(int id) {
        String sqlString = "DELETE FROM calandrier WHERE Id = ?;";
        Application.app.jdbcTemplate.update(
                sqlString,
                id
        );
    }

    /**
     * Insert un nouveau calandrier par rapport au calandrier passé en 
     * paramêtre. 
     * @param cal
     */
    public static void insertCalandrier(Calandrier cal) {
        String sqlString = "INSERT INTO \n"
                + "calandrier (Image, ImageAlt, Contenue,TitleText) \n"
                + "VALUES (?,?,?,?);";
        Application.app.jdbcTemplate.update(
                sqlString,
                cal.getImage(),
                cal.getImageAlt(),
                cal.getContenue(),
                cal.getTitleText()
        );
    }
}
