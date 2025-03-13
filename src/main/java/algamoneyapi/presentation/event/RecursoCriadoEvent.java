package algamoneyapi.presentation.event;

import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;
@Getter

public class RecursoCriadoEvent extends ApplicationEvent {
    private static final long serialVersionUID = 1L;
    private final HttpServletResponse response;
    private final Long codigo;
    public RecursoCriadoEvent(
            Object source, HttpServletResponse response, Long codigo) {
        super(source);
        this.response = response;
        this.codigo = codigo;
    }
}

