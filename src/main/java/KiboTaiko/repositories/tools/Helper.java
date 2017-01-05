package KiboTaiko.repositories.tools;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Helper {
    public static Connection getConnection() throws URISyntaxException, SQLException {
        String dbUrl = System.getenv("JDBC_DATABASE_URL");
        System.out.println("\n\nconnection : "+dbUrl + "\n\n");
    return DriverManager.getConnection(dbUrl);
}
}
