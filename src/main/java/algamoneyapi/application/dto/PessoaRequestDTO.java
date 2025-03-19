package algamoneyapi.application.dto;

import algamoneyapi.core.model.Endereco;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record PessoaRequestDTO(

        @NotNull String nome,


        @NotNull Endereco endereco,


        @NotNull Boolean ativo
) {}