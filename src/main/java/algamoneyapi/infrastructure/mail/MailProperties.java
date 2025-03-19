package algamoneyapi.infrastructure.mail;



import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class MailProperties {

    public static Properties loadProperties() {
        Properties properties = new Properties();
        try (InputStream input = MailProperties.class.getClassLoader().getResourceAsStream("mail.properties")) {
            if (input == null) {
                throw new RuntimeException("Arquivo mail.properties não encontrado!");
            }
            properties.load(input);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao carregar o arquivo mail.properties", e);
        }
        return properties;
    }
}