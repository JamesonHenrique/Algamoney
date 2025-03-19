package algamoneyapi.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record RegisterRequest(

    String nome,

    String email,


    String password) {
}