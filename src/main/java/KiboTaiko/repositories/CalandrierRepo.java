package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.Calandrier;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class CalandrierRepo {

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
        for (int i = 0; i < result.size(); i++) {
            System.out.println("ID : " + result.get(i).getId());
            System.out.println("Image : " + result.get(i).getImage());
            System.out.println("ImageAlt : " + result.get(i).getImageAlt());
            System.out.println("Contenue : " + result.get(i).getContenue());
            System.out.println("TitleText : " + result.get(i).getTitleText());
        }
        return result;
    }

    public static void updateCalandrier(Calandrier cal) {
        String sqlString = "UPDATE calandrier\n"
                + "SET image = ?, imagealt = ?, contenue = ?, titletext = ?\n"
                + "WHERE id = ?;";

        Application.app.jdbcTemplate.update(
                sqlString,
                cal.getImage(),
                cal.getImageAlt(),
                cal.getContenue(),
                cal.getTitleText(),
                cal.getId()
        );
    }
    
    public static void deleteCalandrier(int id) {
        String sqlString = "DELETE FROM calandrier\n"
                + "WHERE id = ?;";

        Application.app.jdbcTemplate.update(
                sqlString,
                id
        );
    }

    public static void insertCalandrier(Calandrier cal) {
        String sqlString = "INSERT INTO calandrier (image,imagealt,contenue,titletext)"
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
