package KiboTaiko;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    public JdbcTemplate jdbcTemplate;
    
    public static Application app;
    @SuppressWarnings("LeakingThisInConstructor")
    public Application() {
        app = this;
    }
}
