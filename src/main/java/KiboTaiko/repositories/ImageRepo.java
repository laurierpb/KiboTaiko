package KiboTaiko.repositories;

import KiboTaiko.Application;
import KiboTaiko.Model.Image;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class ImageRepo {

    /**
     * Ajoute une image a la bd
     *
     * @return une liste de tous les images de la bd
     */
    public static List<Image> getImages() {
        String query = "select * from images;";
        List<Image> result = Application.app.jdbcTemplate.query(query,
                (rs, rowNum) -> new Image(
                        rs.getInt("id"),
                        rs.getBytes("image"),
                        rs.getString("name"),
                        rs.getString("imageAlt")
                )
        );
        return result;
    }

    /**
     * insert une image dans la bd en tant que Byte[]
     *
     * @param image l'image a ajouter a la bd
     * @return The primary key
     */
    public static int postImage(Image image) {
        String query = "INSERT INTO images("
                + "image, name, imagealt) "
                + "VALUES (?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        Application.app.jdbcTemplate.update((Connection connection) -> {
            PreparedStatement ps = connection.prepareStatement(query, new String[]{"id"});
            ps.setBytes(1, ((byte[]) image.getImage()));
            ps.setString(2, image.getName());
            ps.setString(3, image.getImageAlt());
            return ps;
        },
                keyHolder);
        return (int) keyHolder.getKey();
    }

    /**
     * Update les informations de la bd avec le id comme reference de l'image
     *
     * @param image l'image a ajouter a la bd
     */
    public static void putImage(Image image) {
        String query = "UPDATE images "
                + "SET imageAlt=?"
                + "WHERE id = ?";
        Application.app.jdbcTemplate.update(
                query,
                image.getImageAlt(),
                image.getID()
        );
    }

    /**
     * supprime une image par rapport a son ID
     *
     * @param id
     */
    public static void deleteImage(int id) {
        String sqlString = "DELETE FROM images \n"
                + "WHERE id = ?;";

        Application.app.jdbcTemplate.update(
                sqlString,
                id
        );
    }
}
