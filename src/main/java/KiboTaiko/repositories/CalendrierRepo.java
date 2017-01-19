package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.Calendrier;
import KiboTaiko.Model.Image;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class CalendrierRepo {

    /**
     * retourne une liste de tous les calendrier présent dans la base de
     * données.
     *
     * @return une liste de tous les calendrier dans la base de données.
     */
    public static List<Calendrier> getItems() {
        String query = "SELECT calendrier.id, calendrier.image, Titre, contenue, images.image as imagebytea, name, imagealt\n"
                + "FROM calendrier\n"
                + "LEFT JOIN images ON calendrier.image = images.id;";
        List<Calendrier> result = Application.app.jdbcTemplate.query(query,
                (rs, rowNum) -> new Calendrier(
                        rs.getInt("id"),
                        new Image(rs.getInt("image"),
                                rs.getBytes("imagebytea"),
                                rs.getString("name"),
                                rs.getString("imageAlt")
                        ),
                        rs.getString("contenue"),
                        rs.getString("Titre")
                )
        );
        return result;
    }

    /**
     * Update le calendrier qui correspond au calendrier passé en paramêtre
     *
     * @param cal calendrier
     */
    public static void updateItem(Calendrier cal) {
        String sqlString = "UPDATE calendrier\n"
                + "SET Image = ?, Contenue = ?, Titre = ?\n"
                + "WHERE Id = ?;";
        Application.app.jdbcTemplate.update(
                sqlString,
                cal.getImage().getID(),
                cal.getContenue(),
                cal.getTitre(),
                cal.getId()
        );
    }

    /**
     * Supprime un calendrier de la base de données par rapport au ID passé en
     * paramêtre.
     *
     * @param id
     */
    public static void deleteItem(int id) {
        String sqlString = "DELETE FROM calendrier WHERE Id = ?;";
        Application.app.jdbcTemplate.update(
                sqlString,
                id
        );
    }

    /**
     * Insert un nouveau calendrier par rapport au calendrier passé en
     * paramêtre.
     *
     * @param cal
     */
    public static void insertItem(Calendrier cal) {
        String sqlString = "INSERT INTO \n"
                + "calendrier (Image, Contenue, Titre) \n"
                + "VALUES (?,?,?);";
        Application.app.jdbcTemplate.update(
                sqlString,
                cal.getImage().getID(),
                cal.getContenue(),
                cal.getTitre()
        );
    }
}
