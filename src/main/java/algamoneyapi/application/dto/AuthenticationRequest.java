package algamoneyapi.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;


@Builder
public record AuthenticationRequest(

    String email,


    String password) {
}