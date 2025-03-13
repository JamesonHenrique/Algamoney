package algamoneyapi.infrastructure.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(

        info = @Info(title = "Algamoney API", version = "1.0", description = "API para gerenciamento financeiro "
                + "feedbacks", contact = @Contact(name =
                "Jameson Henrique", email = "jamesonhenrique14@gmail.com", url = "https://www.linkedin"
                + ".com/in/jamesonhenrique/")),

        servers = {
                @Server(

                        description = "Local ENV",
                        url = "http://localhost:8080/"
                ),
                @Server(

                        description = "PROD ENV",
                        url = "..."
                )
        }, security = @SecurityRequirement(
        name = "bearerAuth"

)
)

@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER,
        description = "JWT authentication description"
)

public class OpenApiConfig {}