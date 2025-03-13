package algamoneyapi.application.dto;

import lombok.Builder;

@Builder
public record AuthenticationResponse(String token) {
}