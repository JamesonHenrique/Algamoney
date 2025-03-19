package algamoneyapi.infrastructure.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;
@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        Properties mailProperties = MailProperties.loadProperties();

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(mailProperties.getProperty("mailproperty.host"));
        mailSender.setPort(Integer.parseInt(mailProperties.getProperty("mailproperty.port")));
        mailSender.setUsername(mailProperties.getProperty("mailproperty.username"));
        mailSender.setPassword(mailProperties.getProperty("mailproperty.password"));

        Properties props = new Properties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", true);
        props.put("mail.smtp.connectiontimeout", 10000);

        mailSender.setJavaMailProperties(props);

        return mailSender;
    }

}
