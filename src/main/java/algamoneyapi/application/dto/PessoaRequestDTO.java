package algamoneyapi.application.dto;

import algamoneyapi.core.model.Contato;
import algamoneyapi.core.model.Endereco;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PessoaRequestDTO(

        @NotNull String nome,


        @NotNull Endereco endereco,


        @NotNull Boolean ativo,

        @JsonIgnoreProperties("pessoa")
        List<Contato> contatos
) {}