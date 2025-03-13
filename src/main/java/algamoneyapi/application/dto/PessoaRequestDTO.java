package algamoneyapi.application.dto;


import algamoneyapi.core.model.Endereco;


import jakarta.validation.constraints.NotNull;

public record PessoaRequestDTO(
        @NotNull String nome,
        @NotNull Endereco endereco,
        @NotNull Boolean ativo
) {}