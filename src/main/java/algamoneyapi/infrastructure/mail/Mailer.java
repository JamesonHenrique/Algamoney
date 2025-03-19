package algamoneyapi.infrastructure.mail;

import algamoneyapi.core.model.Lancamento;
import algamoneyapi.core.model.Usuario;
import algamoneyapi.core.repository.LancamentoRepository;
import algamoneyapi.core.repository.UsuarioRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class Mailer {

    @Autowired
    private TemplateEngine thymeleaf;
    @Autowired

    private JavaMailSender mailSender;
    @Autowired
    private LancamentoRepository lancamentoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public void avisarSobreLancamentosVencidos(
            List<Lancamento> vencidos, List<Usuario> destinatarios) {
        Map<String, Object> variaveis = new HashMap<>();
        variaveis.put("lancamentos", vencidos);

        List<String> emails = destinatarios.stream()
                .map(Usuario::getEmail)
                .collect(Collectors.toList());
        this.enviarEmail("extcops@gmail.com",
                emails,
                "Lançamentos vencidos",
                "aviso-lancamentos-vencidos",
                variaveis);
    }

    public void enviarEmail(String remetente,
                            List<String> destinatarios, String assunto, String template,
                            Map<String, Object> variaveis) {
        Context context = new Context(new Locale("pt", "BR")) ;

        variaveis.forEach(context::setVariable);

        String mensagem = thymeleaf.process(template, context);

        this.enviarEmail(remetente, destinatarios, assunto, mensagem);
    }

    public void enviarEmail(String remetente,
                            List<String> destinatarios, String assunto, String mensagem) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            helper.setFrom(remetente);
            helper.setTo(destinatarios.toArray(new String[0]));
            helper.setSubject(assunto);
            helper.setText(mensagem, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Problemas com o envio de e-mail!", e);
        }
    }
}
