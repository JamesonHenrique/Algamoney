package algamoneyapi.application.dto;


import lombok.Builder;

@Builder
public record RegisterRequest(String nome, String email, String password) {
}