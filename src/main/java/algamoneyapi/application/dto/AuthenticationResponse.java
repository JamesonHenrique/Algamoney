package algamoneyapi.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AuthenticationResponse(

    String token,
    

    String refreshToken) {
}